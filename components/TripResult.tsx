'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Bookmark, BookmarkCheck } from 'lucide-react'
import { useState } from 'react'
import { TripPlan } from '@/lib/types'
import MoodCard from './MoodCard'
import DayCard from './DayCard'
import TagFilter from './TagFilter'
import ExportButton from './ExportButton'

interface Props {
  plan: TripPlan
  activeTag: string | null
  onTagClick: (tag: string | null) => void
  onBack: () => void
  onSave: () => void
}

export default function TripResult({ plan, activeTag, onTagClick, onBack, onSave }: Props) {
  const [saved, setSaved] = useState(false)
  const palette = plan.vibe.palette
  const accentForDay = (i: number) => palette[i % palette.length] ?? palette[0]

  function handleSave() {
    onSave()
    setSaved(true)
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] py-12 px-4 sm:px-6">
      {/* Grain texture */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03] print:hidden"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      />

      <div className="max-w-2xl mx-auto space-y-6">
        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between print:hidden"
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-stone-400 hover:text-stone-600 transition-colors"
          >
            <ArrowLeft size={14} />
            New trip
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 text-sm px-4 py-2 rounded-xl border border-stone-200 text-stone-500 bg-white hover:border-stone-300 hover:text-stone-700 transition-all duration-150"
            >
              {saved ? <BookmarkCheck size={14} className="text-emerald-500" /> : <Bookmark size={14} />}
              {saved ? 'Saved' : 'Save trip'}
            </button>
            <ExportButton />
          </div>
        </motion.div>

        {/* Mood card */}
        <MoodCard vibe={plan.vibe} destination={plan.destination} />

        {/* Tag filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="print:hidden"
        >
          <TagFilter
            days={plan.days}
            activeTag={activeTag}
            onTagClick={onTagClick}
            accentColor={palette[0]}
          />
        </motion.div>

        {/* Day cards */}
        <div className="space-y-4">
          {plan.days.map((day, i) => (
            <DayCard
              key={day.day}
              day={day}
              index={i}
              accentColor={accentForDay(i)}
              activeTag={activeTag}
              onTagClick={(tag) => onTagClick(activeTag === tag ? null : tag)}
            />
          ))}
        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-stone-300 text-xs pb-8 print:hidden"
        >
          Curated by AI · Feels like a local friend
        </motion.p>
      </div>
    </div>
  )
}
