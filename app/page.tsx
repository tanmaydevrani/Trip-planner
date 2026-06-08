'use client'

import { AnimatePresence, motion } from 'framer-motion'
import InputScreen from '@/components/InputScreen'
import LoadingState from '@/components/LoadingState'
import TripResult from '@/components/TripResult'
import ThemePicker from '@/components/ThemePicker'
import { useTripPlan } from '@/hooks/useTripPlan'

export default function HomePage() {
  const { plan, status, error, activeTag, generate, reset, setTag, saveTrip } = useTripPlan()

  return (
    <>
      <AnimatePresence mode="wait">
        {status === 'idle' || status === 'error' ? (
          <motion.div key="input" exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
            <InputScreen onSubmit={generate} isLoading={false} />
            {error && (
              <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl border border-red-100 text-red-500 text-sm px-5 py-3 rounded-2xl shadow-lg max-w-sm text-center">
                {error}
              </div>
            )}
          </motion.div>
        ) : status === 'loading' ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <LoadingState />
          </motion.div>
        ) : plan ? (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <TripResult
              plan={plan}
              activeTag={activeTag}
              onTagClick={setTag}
              onBack={reset}
              onSave={saveTrip}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
      <ThemePicker />
    </>
  )
}
