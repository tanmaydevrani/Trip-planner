'use client'

import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { TripDay } from '@/lib/types'

interface Props {
  days: TripDay[]
  activeTag: string | null
  onTagClick: (tag: string | null) => void
  accentColor: string
}

export default function TagFilter({ days, activeTag, onTagClick, accentColor }: Props) {
  const allTags = Array.from(
    new Set(days.flatMap(d => d.slots.flatMap(s => s.tags)))
  ).sort()

  if (allTags.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-stone-400 mr-1 shrink-0">Filter:</span>

      {activeTag && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={() => onTagClick(null)}
          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 transition-colors"
        >
          <X size={10} />
          clear
        </motion.button>
      )}

      {allTags.map(tag => {
        const isActive = activeTag === tag
        return (
          <button
            key={tag}
            onClick={() => onTagClick(isActive ? null : tag)}
            className="text-xs px-3 py-1.5 rounded-full border transition-all duration-150 font-medium"
            style={
              isActive
                ? { backgroundColor: accentColor, borderColor: accentColor, color: '#fff' }
                : { borderColor: '#e7e5e4', color: '#78716c', backgroundColor: 'transparent' }
            }
          >
            {tag}
          </button>
        )
      })}
    </div>
  )
}
