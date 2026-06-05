'use client'

import { motion } from 'framer-motion'
import { TripDay, TimeSlot } from '@/lib/types'

interface Props {
  day: TripDay
  index: number
  accentColor: string
  activeTag: string | null
  onTagClick: (tag: string) => void
}

function SlotRow({ slot, accentColor, onTagClick }: { slot: TimeSlot; accentColor: string; onTagClick: (t: string) => void }) {
  return (
    <div className="py-5 first:pt-0 last:pb-0 border-b border-stone-100 last:border-0">
      {/* Time label */}
      <p className="text-[10px] tracking-widest uppercase text-stone-400 mb-1.5 font-medium">
        {slot.time}
      </p>

      {/* Activity title */}
      <h4 className="text-stone-800 font-medium text-[15px] mb-2">{slot.title}</h4>

      {/* Description */}
      <p className="text-stone-500 text-sm leading-relaxed mb-3">{slot.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {slot.tags.map(tag => (
          <button
            key={tag}
            onClick={() => onTagClick(tag)}
            className="text-[11px] px-2.5 py-1 rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 transition-colors font-medium"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function DayCard({ day, index, accentColor, activeTag, onTagClick }: Props) {
  const visibleSlots = activeTag
    ? day.slots.filter(s => s.tags.includes(activeTag))
    : day.slots

  if (activeTag && visibleSlots.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-sm"
    >
      {/* Left accent bar via a flex wrapper */}
      <div className="flex">
        <div className="w-1 shrink-0" style={{ backgroundColor: accentColor }} />

        <div className="flex-1 p-6 sm:p-8">
          {/* Day header */}
          <div className="mb-6">
            <span
              className="text-[10px] tracking-widest uppercase font-semibold"
              style={{ color: accentColor }}
            >
              Day {day.day}
            </span>
            <h3
              className="text-xl text-stone-800 mt-0.5"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              {day.theme.replace(/^Day \d+ — /, '')}
            </h3>
          </div>

          {/* Time slots */}
          <div>
            {visibleSlots.map(slot => (
              <SlotRow
                key={slot.title}
                slot={slot}
                accentColor={accentColor}
                onTagClick={onTagClick}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
