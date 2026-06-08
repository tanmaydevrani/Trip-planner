'use client'

import { motion } from 'framer-motion'
import { useTheme, THEMES, type ThemeId } from '@/providers/ThemeProvider'
import { Palette } from 'lucide-react'
import { useState } from 'react'

export default function ThemePicker() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 print:hidden flex flex-col items-end gap-2">
      {/* Swatches panel */}
      <motion.div
        initial={false}
        animate={open ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 8 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none"
        style={{ pointerEvents: open ? 'auto' : 'none' }}
      >
        <div className="flex flex-col gap-2 p-3 rounded-2xl bg-white/90 backdrop-blur-xl shadow-2xl border border-white/60">
          {THEMES.map(t => (
            <motion.button
              key={t.id}
              onClick={() => { setTheme(t.id as ThemeId); setOpen(false) }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="flex items-center gap-3 px-3 py-2 rounded-xl transition-colors hover:bg-stone-50"
            >
              <div
                className="w-6 h-6 rounded-full shadow-sm flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${t.from}, ${t.to})` }}
              />
              <span className="text-sm font-medium text-stone-600 whitespace-nowrap">{t.label}</span>
              {theme.id === t.id && (
                <motion.div
                  layoutId="active-check"
                  className="ml-auto w-2 h-2 rounded-full"
                  style={{ background: t.from }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="w-12 h-12 rounded-2xl shadow-xl flex items-center justify-center text-white"
        style={{ background: `linear-gradient(135deg, ${theme.from}, ${theme.to})` }}
      >
        <Palette size={18} />
      </motion.button>
    </div>
  )
}
