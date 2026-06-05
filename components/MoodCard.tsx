'use client'

import { motion } from 'framer-motion'
import { TripVibe } from '@/lib/types'

interface Props {
  vibe: TripVibe
  destination: string
}

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.slice(0, 2), 16)
  const g = parseInt(clean.slice(2, 4), 16)
  const b = parseInt(clean.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export default function MoodCard({ vibe, destination }: Props) {
  const primary = vibe.palette[0] ?? '#C4A882'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full rounded-3xl overflow-hidden border"
      style={{
        backgroundColor: hexToRgba(primary, 0.08),
        borderColor: hexToRgba(primary, 0.2),
      }}
    >
      <div className="p-8 sm:p-12">
        {/* Destination label */}
        <p className="text-xs tracking-widest uppercase font-medium mb-6" style={{ color: primary }}>
          {destination}
        </p>

        {/* Emoji cluster */}
        <div className="text-4xl mb-6 tracking-wide">{vibe.emojis}</div>

        {/* Vibe label */}
        <h2
          className="text-3xl sm:text-4xl text-stone-800 mb-6 leading-snug"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          {vibe.label}
        </h2>

        {/* Color palette swatches */}
        <div className="flex items-center gap-2 mb-8">
          {vibe.palette.map((color, i) => (
            <motion.div
              key={color}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.07 }}
              title={color}
              className="w-8 h-8 rounded-full border-2 border-white shadow-sm cursor-default"
              style={{ backgroundColor: color }}
            />
          ))}
          <span className="ml-2 text-xs text-stone-400 font-mono">{vibe.palette[0]}</span>
        </div>

        {/* Mood keywords */}
        <div className="flex flex-wrap gap-2">
          {vibe.keywords.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.05 }}
              className="text-xs px-3 py-1.5 rounded-full border font-medium tracking-wide"
              style={{
                borderColor: hexToRgba(primary, 0.4),
                color: primary,
                backgroundColor: hexToRgba(primary, 0.06),
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
