# Trip Vibe Planner

> Describe your travel mood in plain words — AI builds a full day-by-day itinerary with a visual vibe board.

No dropdowns, no date pickers, no filters. Just a text box. Tell it you want *4 days in Rajasthan, rooftop dinners, no tourist traps* and watch a complete, personality-driven itinerary appear.

## Stack

- **Next.js 16** — App Router, server-side API route keeps the key safe
- **TypeScript** — full type coverage, interfaces mirror the AI JSON schema exactly
- **Tailwind CSS** — layout and spacing
- **Shadcn/UI** — base component primitives
- **Framer Motion** — staggered card reveals, mood card entrance animation
- **Anthropic Claude** — the brain; carefully prompted to behave like a local curator
- **Redux Toolkit** — trip state, saved trips list, tag filter
- **MUI** — supplementary components
- **Google Fonts** (Playfair Display + Inter)

## Features

- **Natural language input** — no forms, no filters, just describe how you want to feel
- **Mood card** — AI-generated color palette, vibe label, emoji cluster applied dynamically to the UI
- **Day-by-day itinerary** — warm editorial descriptions, each card's left border takes the palette accent color
- **Tag filter** — click any tag (#streetfood, #hidden-gem…) to filter across all days. Pure frontend state, no extra API call
- **Save trip** — Redux stores multiple generated trips; navigate back without losing results
- **Print/export** — clean print stylesheet, one click

## Getting started

```bash
# 1. Clone and install
npm install

# 2. Set your API key
cp .env.local.example .env.local
# then edit .env.local and add your ANTHROPIC_API_KEY

# 3. Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How the AI layer works

The `/api/plan` route sends the user's raw description to Claude with a carefully engineered system prompt that instructs it to:

1. Extract the trip's emotional identity first
2. Build the itinerary *around* that vibe, not despite it
3. Return strictly valid JSON matching the typed schema — no preamble, no markdown fences
4. Reflect user preferences explicitly in the copy (hates crowds? the itinerary will say so)

The JSON feeds directly into typed React components with zero transformation.

## Project structure

```
app/
  api/plan/route.ts   ← Claude call, JSON parse, validation
  page.tsx            ← state machine: idle → loading → result
  layout.tsx
components/
  InputScreen.tsx     ← expanding textarea, grain texture, serif headline
  LoadingState.tsx    ← rotating phrases, not a spinner
  MoodCard.tsx        ← palette swatches, vibe label, keywords
  DayCard.tsx         ← staggered reveal, accent border, time slots
  TagFilter.tsx       ← clickable tag pills, clear button
  TripResult.tsx      ← assembles everything, handles save/back
hooks/
  useTripPlan.ts      ← wraps Redux dispatch and the fetch call
store/
  tripSlice.ts        ← idle/loading/done/error, saved trips, active tag
lib/
  types.ts            ← TripPlan, TripVibe, TripDay, TimeSlot
  prompts.ts          ← the curator system prompt
```
