# CLAUDE.md — LeadGen Project Guide

This file tells Claude Code exactly how this project works. Read it every session before touching code.

---

## What This App Does

**LeadGen** ("100 Day Exit Plan") is an AI-powered lead generation + CRM SaaS for service-based businesses (plumbers, HVAC, roofers, etc.). Users find local businesses that need a website or digital upgrade, then reach out and close them as clients.

**Core flow:** Hunt leads via Google Maps or Gemini AI → Analyze with BANT/Prospector → Reach out → Track in CRM → Close deals

---

## Tech Stack

| Layer | Tool |
|---|---|
| Frontend | React 19, TypeScript 5.8, Vite 6 |
| Styling | Tailwind CSS 4, Lucide React icons, Motion animations |
| Backend | Firebase Auth + Firestore (user data isolation per UID) |
| AI | Google Gemini (`@google/genai`) for lead discovery + analysis |
| Testing | Vitest + React Testing Library |
| CSV | PapaParse |

---

## Running the App

```bash
# Install
npm install

# Dev server (localhost:5173)
npm run dev

# Build
npm run build

# Tests
npm test

# Mock auth mode (skip Firebase login)
VITE_MOCK_AUTH=true npm run dev
```

Required env vars in `.env.local`:
```
GEMINI_API_KEY=your_key_here
```

Settings stored per-user in Firestore (geminiKey, googleMapsKey, netlifyToken, webhookUrls).

---

## Project Structure

```
src/
├── App.tsx                     # Root: auth, Firestore listeners, routing
├── firebase.ts                 # Firebase init, signInWithGoogle, logout
├── types.ts                    # All TypeScript types (Lead, AppState, etc.)
├── main.tsx                    # Vite entry point
├── utils/
│   └── state.ts                # parseAppState, localStorage helpers
└── components/
    ├── LeadGenerator.tsx       # 🔑 Core hunting engine (Gemini + Maps API)
    ├── Prospector.tsx          # Deep-analyze a lead (BANT, decision maker)
    ├── Leads.tsx               # CRM pipeline view
    ├── Dashboard.tsx           # Daily routine tracker
    ├── AIAgentShortcut.tsx     # AI automation shortcuts
    ├── OutreachGenerator.tsx   # Write proposals/emails via AI
    ├── Sidebar.tsx             # Navigation
    ├── LandingPage.tsx         # Logged-out landing page
    └── [15 other feature pages]
```

---

## Key Data Types

```typescript
// Core CRM entity
interface Lead {
  id: string;
  businessName: string;
  url: string;
  niche: string;
  status: LeadStatus;  // 'New' | 'Contacted' | 'Meeting Booked' | 'Proposal Sent' | 'Closed Won' | 'Closed Lost'
  score?: number;      // 0-10 AI quality score
  phone?: string;
  decisionMaker?: { name: string; title: string; linkedin?: string };
  bant?: { budget?: string; authority?: string; need?: string; timeline?: string };
  signals?: { missingWebsite?: boolean; lowReviews?: boolean; slowSpeed?: boolean; noCta?: boolean };
  sniperInsights?: { ownerVibe: string; bestSalesAngle: string; icebreaker: string };
  isSaved?: boolean;
}

// App-wide settings (stored in Firestore per user)
interface AppSettings {
  geminiKey: string;
  googleMapsKey: string;
  netlifyToken: string;
  webhookUrls: string[];
}
```

---

## Architecture Notes

- **Auth:** Firebase Google OAuth. `App.tsx` listens via `onAuthStateChanged`. `VITE_MOCK_AUTH=true` bypasses Firebase for testing.
- **Data flow:** Firestore is source of truth. Leads/routines sync via `onSnapshot` listeners in `App.tsx`. Local state is a mirror.
- **AI calls:** All Gemini calls go through `@google/genai` SDK with `Type` for structured JSON output. API key comes from user's Firestore settings or `.env.local`.
- **Hunt modes:** `specific` (user-chosen niche/city), `roulette` (random), `infinite` (auto-loops every 5s after results).

---

## Common Tasks

### Add a new page/tab
1. Create `src/components/MyPage.tsx` with a named export
2. Import it in `src/App.tsx`
3. Add a case to the tab switcher in `App.tsx`
4. Add nav item in `src/components/Sidebar.tsx`

### Add a new Lead field
1. Add to `Lead` interface in `src/types.ts`
2. Update `isValidLead()` if it's required
3. Update Firestore reads/writes in `App.tsx` and display in `Leads.tsx`

### Change AI prompts
- Lead hunting prompt: `LeadGenerator.tsx` → `toggleHunting()` function
- Lead analysis prompt: `Prospector.tsx` → `analyzeWithAI()` function
- Outreach writing prompt: `OutreachGenerator.tsx`

### Run a single test file
```bash
npm test -- src/components/__tests__/Sidebar.test.tsx
```

---

## Known Issues / Areas to Watch

- `LeadGenerator.tsx` is ~1,450 lines — the Gemini hunting logic lives in `toggleHunting()` starting around line 211
- 44 `@ts-ignore` / `any` usages across codebase — avoid adding more
- No pagination in `Leads.tsx` — all leads load into memory
- API keys are stored in Firestore user settings (client-accessible) — acceptable for MVP but not for production scale
- Infinite hunt mode accumulates leads in memory — no cleanup between loops

---

## Do's and Don'ts

**Do:**
- Keep components under 400 lines — split when they grow beyond that
- Use the existing `Lead` type — don't add `any` casts
- Write Vitest tests for new utility functions in `src/utils/`
- Use Tailwind classes, not inline styles

**Don't:**
- Don't add new npm packages without asking — bundle size matters
- Don't hardcode API keys — always use env vars or Firestore settings
- Don't skip TypeScript types — the existing guards in `types.ts` are there for a reason
- Don't use `alert()` for errors — use the existing `error` state pattern in components
