'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plane } from 'lucide-react'

const PLACEHOLDERS = [
  '4 days in Rajasthan, I love rooftop dinners, hate crowded tourist spots, want to feel like a local...',
  'Weekend in Goa but skip the beach parties — I want chill cafés, fresh fish, and morning walks...',
  '5 days in Kyoto, slow pace, autumn, mostly temples and tea and long walks in quiet neighborhoods...',
  'Coorg for 3 days. Coffee estates, misty mornings, good food. Not a resort person.',
]

interface Props {
  onSubmit: (prompt: string) => void
  isLoading: boolean
}

export default function InputScreen({ onSubmit, isLoading }: Props) {
  const [value, setValue] = useState('')
  const [placeholder, setPlaceholder] = useState(PLACEHOLDERS[0])
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const idx = Math.floor(Math.random() * PLACEHOLDERS.length)
    setPlaceholder(PLACEHOLDERS[idx])
  }, [])

  // Auto-resize the textarea
  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = `${ta.scrollHeight}px`
  }, [value])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (value.trim().length < 10 || isLoading) return
    onSubmit(value.trim())
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-[#FAFAF7]">
      {/* Grain texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl"
      >
        {/* Logo mark */}
        <div className="flex items-center gap-2 mb-12 text-stone-400">
          <Plane size={16} strokeWidth={1.5} />
          <span className="text-xs tracking-widest uppercase font-medium">Trip Vibe</span>
        </div>

        <h1
          className="text-4xl sm:text-5xl leading-[1.15] text-stone-800 mb-4"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          Where are you going,
          <br />
          <em className="not-italic text-stone-500">and how do you want to feel?</em>
        </h1>

        <p className="text-stone-400 text-sm mb-10 leading-relaxed">
          No dropdowns. No filters. Just tell me about your trip the way you'd tell a friend.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder={placeholder}
              disabled={isLoading}
              rows={4}
              className="
                w-full resize-none bg-white/80 border border-stone-200 rounded-2xl px-5 py-4
                text-stone-700 text-[15px] leading-relaxed placeholder:text-stone-300
                focus:outline-none focus:ring-2 focus:ring-stone-300 focus:border-transparent
                transition-all duration-200 min-h-[120px]
                disabled:opacity-50
              "
              onKeyDown={e => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit(e)
              }}
            />
            <div className="absolute bottom-3 right-4 text-[11px] text-stone-300 select-none">
              ⌘↵ to send
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={value.trim().length < 10 || isLoading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="
              w-full py-3.5 px-6 rounded-2xl font-medium text-[15px]
              bg-stone-800 text-stone-50
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-colors duration-200
              hover:bg-stone-700
            "
          >
            {isLoading ? 'Building your trip…' : 'Plan my trip'}
          </motion.button>
        </form>

        <p className="text-center text-stone-300 text-xs mt-8">
          Curated by AI · Feels like a local friend
        </p>
      </motion.div>
    </div>
  )
}
