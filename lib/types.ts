export interface TripVibe {
  label: string
  keywords: string[]
  palette: string[]
  emojis: string
}

export interface TimeSlot {
  time: string
  title: string
  description: string
  tags: string[]
}

export interface TripDay {
  day: number
  theme: string
  slots: TimeSlot[]
}

export interface TripPlan {
  destination: string
  vibe: TripVibe
  days: TripDay[]
}

export type PlanStatus = 'idle' | 'loading' | 'done' | 'error'
