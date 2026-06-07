import Groq from 'groq-sdk'
import { CURATOR_SYSTEM_PROMPT } from '@/lib/prompts'
import { TripPlan } from '@/lib/types'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

export async function POST(req: Request) {
  const { prompt } = await req.json()

  if (!prompt || typeof prompt !== 'string' || prompt.trim().length < 10) {
    return Response.json({ error: 'Tell me a bit more about your trip.' }, { status: 400 })
  }

  if (!process.env.GROQ_API_KEY) {
    return Response.json({ error: 'API key not configured.' }, { status: 500 })
  }

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 4096,
      messages: [
        { role: 'system', content: CURATOR_SYSTEM_PROMPT },
        { role: 'user', content: prompt.trim() },
      ],
    })

    const raw = completion.choices[0]?.message?.content ?? ''
    const cleaned = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim()

    const plan: TripPlan = JSON.parse(cleaned)

    if (!plan.vibe || !Array.isArray(plan.days) || plan.days.length === 0) {
      throw new Error('Response was missing required fields')
    }

    return Response.json(plan)
  } catch (err) {
    console.error('[/api/plan]', err)
    return Response.json(
      { error: 'Could not build your itinerary. Try rephrasing your trip description.' },
      { status: 500 }
    )
  }
}
