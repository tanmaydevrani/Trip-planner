'use client'

import { createContext, useContext, useEffect, useState } from 'react'

export type ThemeId = 'coral' | 'ocean' | 'violet' | 'emerald' | 'amber' | 'midnight'

export interface AppTheme {
  id: ThemeId
  label: string
  from: string
  to: string
}

export const THEMES: AppTheme[] = [
  { id: 'coral',    label: 'Coral',    from: '#f43f5e', to: '#fb923c' },
  { id: 'ocean',    label: 'Ocean',    from: '#3b82f6', to: '#06b6d4' },
  { id: 'violet',   label: 'Violet',   from: '#8b5cf6', to: '#ec4899' },
  { id: 'emerald',  label: 'Emerald',  from: '#10b981', to: '#3b82f6' },
  { id: 'amber',    label: 'Amber',    from: '#f59e0b', to: '#ef4444' },
  { id: 'midnight', label: 'Midnight', from: '#6366f1', to: '#8b5cf6' },
]

interface ThemeCtx {
  theme: AppTheme
  setTheme: (id: ThemeId) => void
  themes: AppTheme[]
}

const ThemeContext = createContext<ThemeCtx>({
  theme: THEMES[0],
  setTheme: () => {},
  themes: THEMES,
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>('coral')

  useEffect(() => {
    const saved = localStorage.getItem('trip-vibe-theme') as ThemeId | null
    if (saved && THEMES.find(t => t.id === saved)) setThemeId(saved)
  }, [])

  const current = THEMES.find(t => t.id === themeId)!

  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--theme-from', current.from)
    root.style.setProperty('--theme-to', current.to)
  }, [current])

  function setTheme(id: ThemeId) {
    setThemeId(id)
    localStorage.setItem('trip-vibe-theme', id)
  }

  return (
    <ThemeContext.Provider value={{ theme: current, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
