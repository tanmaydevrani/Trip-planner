'use client'

import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/store/store'
import { setLoading, setPlan, setError, resetPlan, setActiveTag, saveCurrentTrip } from '@/store/tripSlice'
import { TripPlan } from '@/lib/types'

export function useTripPlan() {
  const dispatch = useDispatch<AppDispatch>()
  const { plan, status, error, activeTag, savedTrips } = useSelector((s: RootState) => s.trip)

  async function generate(prompt: string) {
    dispatch(setLoading())

    try {
      const res = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error ?? `Request failed (${res.status})`)
      }

      const data: TripPlan = await res.json()
      dispatch(setPlan(data))
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Something went wrong'))
    }
  }

  return {
    plan,
    status,
    error,
    activeTag,
    savedTrips,
    generate,
    reset: () => dispatch(resetPlan()),
    setTag: (tag: string | null) => dispatch(setActiveTag(tag)),
    saveTrip: () => dispatch(saveCurrentTrip()),
  }
}
