'use client'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TripPlan, PlanStatus } from '@/lib/types'

interface TripState {
  plan: TripPlan | null
  status: PlanStatus
  error: string | null
  activeTag: string | null
  savedTrips: TripPlan[]
}

const initialState: TripState = {
  plan: null,
  status: 'idle',
  error: null,
  activeTag: null,
  savedTrips: [],
}

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    setLoading(state) {
      state.status = 'loading'
      state.error = null
    },
    setPlan(state, action: PayloadAction<TripPlan>) {
      state.plan = action.payload
      state.status = 'done'
      state.activeTag = null
    },
    setError(state, action: PayloadAction<string>) {
      state.status = 'error'
      state.error = action.payload
    },
    resetPlan(state) {
      state.plan = null
      state.status = 'idle'
      state.error = null
      state.activeTag = null
    },
    setActiveTag(state, action: PayloadAction<string | null>) {
      state.activeTag = action.payload
    },
    saveCurrentTrip(state) {
      if (state.plan && !state.savedTrips.find(t => t.destination === state.plan!.destination && t.vibe.label === state.plan!.vibe.label)) {
        state.savedTrips.push(state.plan)
      }
    },
    loadSavedTrip(state, action: PayloadAction<TripPlan>) {
      state.plan = action.payload
      state.status = 'done'
      state.activeTag = null
    },
  },
})

export const { setLoading, setPlan, setError, resetPlan, setActiveTag, saveCurrentTrip, loadSavedTrip } = tripSlice.actions
export default tripSlice.reducer
