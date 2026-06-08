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
  const [c0, c1, c2] = vibe.palette
  const primary = c0 ?? '#C4A882'
  const secondary = c1 ?? primary

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="w-full rounded-3xl overflow-hidden relative"
      style={{ background: `linear-gradient(140deg, ${hexToRgba(primary, 0.18)} 0%, ${hexToRgba(secondary, 0.28)} 100%)` }}
    >
      {/* Decorative blurred orb */}
      <div
        className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ background: primary }}
      />
      <div
        className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: secondary }}
      />

      <div className="relative p-8 sm:p-10">
        {/* Destination pill */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border"
          style={{
            borderColor: hexToRgba(primary, 0.3),
            background: hexToRgba(primary, 0.1),
          }}
        >
          <span className="text-xs tracking-widest uppercase font-semibold" style={{ color: primary }}>
            {destination}
          </span>
        </motion.div>

        {/* Emoji cluster */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
          className="text-5xl mb-5 animate-float inline-block"
        >
          {vibe.emojis}
        </motion.div>

        {/* Vibe label */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl sm:text-4xl text-stone-800 mb-6 leading-snug"
          style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
        >
          {vibe.label}
        </motion.h2>

        {/* Palette swatches */}
        <div className="flex items-center gap-3 mb-8">
          {vibe.palette.map((color, i) => (
            <motion.div
              key={color}
              initial={{ opacity: 0, scale: 0, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.08, type: 'spring', stiffness: 260 }}
              title={color}
              className="group relative"
            >
              <div
                className="w-9 h-9 rounded-xl shadow-md border-2 border-white cursor-default transition-transform duration-200 group-hover:scale-110"
                style={{ backgroundColor: color }}
              />
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[10px] font-mono text-stone-500 whitespace-nowrap transition-opacity">
                {color}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Keywords */}
        <div className="flex flex-wrap gap-2 mt-2">
          {vibe.keywords.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + i * 0.06 }}
              className="text-xs px-3.5 py-1.5 rounded-full border font-semibold tracking-wide backdrop-blur-sm"
              style={{
                borderColor: hexToRgba(primary, 0.35),
                color: primary,
                background: hexToRgba(primary, 0.08),
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
