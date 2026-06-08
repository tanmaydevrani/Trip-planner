'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useTheme } from '@/providers/ThemeProvider'

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
  const { theme } = useTheme()

  useEffect(() => {
    const idx = Math.floor(Math.random() * PLACEHOLDERS.length)
    setPlaceholder(PLACEHOLDERS[idx])
  }, [])

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
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-[#f8f8fc]">

      {/* Animated background blobs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full -top-48 -left-48 blur-3xl opacity-20 animate-blob"
        style={{ background: theme.from }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full -bottom-32 -right-32 blur-3xl opacity-15 animate-blob-delay-2"
        style={{ background: theme.to }}
      />
      <div
        className="absolute w-[350px] h-[350px] rounded-full top-1/3 right-1/4 blur-3xl opacity-10 animate-blob-delay-4"
        style={{ background: theme.from }}
      />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-xl"
      >
        {/* Glass card */}
        <div className="rounded-3xl bg-white/75 backdrop-blur-2xl border border-white/80 shadow-2xl shadow-black/8 p-8 sm:p-10">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="flex items-center gap-2 mb-8"
          >
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
            >
              <Sparkles size={14} className="text-white" />
            </div>
            <span className="text-xs tracking-widest uppercase font-semibold text-stone-400">Trip Vibe</span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-3"
          >
            <h1
              className="text-4xl sm:text-5xl leading-[1.12] text-stone-800"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              Where are you going,
              <br />
              <em
                className="not-italic"
                style={{
                  background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                and how do you want to feel?
              </em>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-stone-400 text-sm mb-8 leading-relaxed"
          >
            No dropdowns. No filters. Just tell me about your trip the way you'd tell a friend.
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="relative"
            >
              <textarea
                ref={textareaRef}
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={placeholder}
                disabled={isLoading}
                rows={4}
                className="
                  w-full resize-none rounded-2xl px-5 py-4
                  text-stone-700 text-[15px] leading-relaxed placeholder:text-stone-300
                  focus:outline-none transition-all duration-200 min-h-[120px]
                  disabled:opacity-50 bg-stone-50/80 border border-stone-100
                  focus:border-transparent focus:ring-2
                "
                style={{
                  ['--tw-ring-color' as string]: `${theme.from}50`,
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit(e)
                }}
              />
              <div className="absolute bottom-3 right-4 text-[11px] text-stone-300 select-none">
                ⌘↵ to send
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              type="submit"
              disabled={value.trim().length < 10 || isLoading}
              whileHover={{ scale: 1.015, boxShadow: `0 8px 30px ${theme.from}55` }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-4 px-6 rounded-2xl font-semibold text-[15px] text-white
                disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
            >
              {isLoading ? 'Building your trip…' : 'Plan my trip ✦'}
            </motion.button>
          </form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-stone-300 text-xs mt-6"
          >
            Curated by AI · Feels like a local friend
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}
