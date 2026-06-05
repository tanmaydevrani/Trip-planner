'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PHRASES = [
  'Reading between the lines…',
  'Finding the good spots…',
  'Skipping the tourist traps…',
  'Talking to the locals…',
  'Avoiding the obvious…',
  'Catching the golden hour…',
  'Building your itinerary…',
  'Almost there…',
]

export default function LoadingState() {
  const [phraseIdx, setPhraseIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setPhraseIdx(i => (i + 1) % PHRASES.length)
    }, 2000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAFAF7]">
      {/* Grain texture */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      <div className="text-center space-y-8">
        {/* Animated dots */}
        <div className="flex items-center justify-center gap-2">
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              className="w-2 h-2 rounded-full bg-stone-400"
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>

        <div className="h-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={phraseIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="text-stone-500 text-lg"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              {PHRASES[phraseIdx]}
            </motion.p>
          </AnimatePresence>
        </div>

        <p className="text-stone-300 text-xs tracking-wide">
          This usually takes 15–20 seconds
        </p>
      </div>
    </div>
  )
}
