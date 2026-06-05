import Anthropic from '@anthropic-ai/sdk'
import { CURATOR_SYSTEM_PROMPT } from '@/lib/prompts'
import { TripPlan } from '@/lib/types'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(req: Request) {
  const { prompt } = await req.json()

  if (!prompt || typeof prompt !== 'string' || prompt.trim().length < 10) {
    return Response.json({ error: 'Tell me a bit more about your trip.' }, { status: 400 })
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: 'API key not configured.' }, { status: 500 })
  }

  try {
    const message = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 4096,
      system: CURATOR_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: prompt.trim() }],
    })

    const raw = message.content[0].type === 'text' ? message.content[0].text : ''

    // Claude sometimes wraps in fences despite the prompt — strip just in case
    const cleaned = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim()

    const plan: TripPlan = JSON.parse(cleaned)

    // Basic validation so the UI doesn't blow up on a malformed response
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
