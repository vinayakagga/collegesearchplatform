# UniScout / College Search Platform — Agent Context

> **Purpose:** Single source of truth for AI agents continuing development.  
> **Product:** Indian college discovery, search, filter, compare, and (planned) save.  
> **Brand in UI:** UniScout (`src/components/navbar.tsx`)

---

## 1. Quick facts

| Item | Value |
|------|--------|
| Repo folder | `collegesearchplatform` |
| Package name | `collegesearchplatform` |
| Framework | Next.js **16.2.6** (App Router, Turbopack in dev) |
| React | **19.2.4** |
| Language | TypeScript **5.9.3** (strict) |
| Styling | Tailwind CSS **v4**, shadcn/ui (`base-lyra` style) |
| Database | PostgreSQL via **Prisma 7.8.0** (Neon-compatible) |
| Auth (dependency only) | `@clerk/nextjs` **7.4.0** — **not wired yet** |
| Path alias | `@/*` → `src/*` |

---

## 2. Runtime & toolchain versions

Verified on Windows (May 2026):

| Tool | Version |
|------|---------|
| Node.js | v22.22.0 |
| npm | 11.15.0 |
| Prisma CLI | 7.8.0 |
| @prisma/client | 7.8.0 |
| Prisma Studio | 0.27.3 |

Install deps: `npm install`  
Dev server: `npm run dev` → http://localhost:3000  
Production build: `npm run build` then `npm run start`  
Lint: `npm run lint`

---

## 3. Environment variables

| Variable | Required | Used by |
|----------|----------|---------|
| `DATABASE_URL` | **Yes** (Prisma, seed) | `prisma.config.ts`, `src/lib/prisma.ts` |

**Planned (not in codebase yet):**

| Variable | For |
|----------|-----|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk auth |
| `CLERK_SECRET_KEY` | Clerk server |
| `CLERK_WEBHOOK_SECRET` | User sync webhooks |

Never commit `.env`. Agents must not print secret values from `.env`.

---

## 4. NPM scripts

| Script | Command | Notes |
|--------|---------|-------|
| `dev` | `next dev` | Hot reload, Turbopack |
| `build` | `next build` | Typecheck + static generation |
| `start` | `next start` | After build |
| `lint` | `eslint` | Next ESLint config |

**Prisma (via CLI, not in package.json scripts):**

```bash
npx prisma generate    # Regenerate client after schema change
npx prisma db push     # Sync schema to DB (no migration files yet)
npx prisma db seed     # Runs: npx ts-node ./prisma/seed.ts
npx prisma studio      # DB GUI
npx prisma migrate dev # When migrations are introduced
```

Seed config: `prisma.config.ts` → `migrations.seed`

---

## 5. Routes & pages (App Router)

There are **no REST API routes** under `src/app/api/` yet. All behavior is pages + client state.

| Route | File | Render | Description |
|-------|------|--------|-------------|
| `/` | `src/app/page.tsx` | Client | Main discovery: search, filters, grid, compare selection, pagination |
| `/colleges` | `src/app/colleges/page.tsx` | Server | Redirects to `/` |
| `/colleges/[id]` | `src/app/colleges/[id]/page.tsx` | Server | Detail page; `id` matches **static** `colleges-data` ids (`"1"`–`"6"`) |
| `/colleges/compare` | `src/app/colleges/compare/page.tsx` | Server | Placeholder; compare UI on home not linked here yet |
| `/saved` | `src/app/saved/page.tsx` | Server | Placeholder; saved colleges need Clerk + Prisma |

**Build output (static/dynamic):**

- `○` `/`, `/colleges`, `/colleges/compare`, `/saved`
- `ƒ` `/colleges/[id]` (dynamic)

---

## 6. Recommended API endpoints (to implement)

Agents should add these under `src/app/api/` when connecting Prisma to the UI.

### Colleges

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/colleges` | List with query: `q`, `type`, `minFees`, `maxFees`, `location`, `sort`, `page`, `limit` |
| `GET` | `/api/colleges/[id]` | Single college by DB `id` (cuid) |
| `POST` | `/api/colleges` | Admin create (auth + role) |
| `PATCH` | `/api/colleges/[id]` | Admin update |
| `DELETE` | `/api/colleges/[id]` | Admin delete |

### Saved colleges (requires auth)

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/saved` | Current user's saved colleges |
| `POST` | `/api/saved` | Body: `{ collegeId }` |
| `DELETE` | `/api/saved/[collegeId]` | Unsave |

### Users (Clerk webhook / sync)

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/webhooks/clerk` | Sync `User` row on sign-up |

### Compare (optional)

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/compare?ids=id1,id2` | Side-by-side payload for 2–4 ids |

Use `src/lib/prisma.ts` in route handlers. Return JSON; map DB fields to frontend `College` shape (see §8).

---

## 7. Database schema (Prisma)

File: `prisma/schema.prisma`  
Provider: `postgresql`  
Migrations folder: `prisma/migrations` (empty — schema synced via `db push`)

### `College`

| Field | Type | Notes |
|-------|------|-------|
| `id` | `String` @id @default(cuid()) | **Not** the same as static UI ids `"1"`–`"6"` |
| `name` | `String` | |
| `location` | `String` | e.g. `"New Delhi, DL"` — state code used for region filters |
| `fees` | `Int` | Annual fees in INR |
| `rating` | `Float` | e.g. 4.8 |
| `placementPercentage` | `Int` | 0–100 |
| `description` | `String` | |
| `image` | `String` | URL |
| `courses` | `String[]` | Maps to UI `programs` |
| `createdAt` | `DateTime` | |

**Not in DB yet:** `type`, `ranking`, `acceptanceRate`, `enrollment` — only in static `colleges-data.ts`. Extend schema if filters should be DB-backed.

### `User`

| Field | Type | Notes |
|-------|------|-------|
| `id` | `String` @id @default(cuid()) | Internal id |
| `clerkId` | `String` @unique | Clerk user id |
| `email` | `String` @unique | |
| `createdAt` | `DateTime` | |
| `savedColleges` | `SavedCollege[]` | |

### `SavedCollege`

| Field | Type | Notes |
|-------|------|-------|
| `id` | `String` @id @default(cuid()) | |
| `userId` | `String` | FK → `User.id` |
| `collegeId` | `String` | **No FK relation to College in schema** — store id string only |
| `createdAt` | `DateTime` | |

**Gap:** Add `college College @relation(...)` on `SavedCollege` when wiring saves.

### Seed

- File: `prisma/seed.ts`
- Imports: `src/lib/prisma.ts`
- Deletes all colleges, inserts 6 (IIT Delhi, DTU, NSUT, IIT Bombay, BITS Pilani, VIT Vellore)
- Run: `npx prisma db seed`

---

## 8. Data model: UI vs database

### Frontend type (`src/components/college-card.tsx`)

```ts
interface College {
  id: string
  name: string
  location: string
  type: string              // "public" | "private" | ...
  ranking: number
  acceptanceRate: number
  tuition: number           // INR
  enrollment: number
  image: string
  featured?: boolean
  programs: string[]
}
```

### Static data (`src/lib/colleges-data.ts`)

- **6 colleges**, ids `"1"` … `"6"`
- Powers: home page, detail page, compare bar
- Fields include `type`, `ranking`, `acceptanceRate`, `tuition`, `programs`

### Prisma → UI mapper (implement in `src/lib/college-mapper.ts`)

| UI field | DB field / rule |
|----------|-----------------|
| `id` | `id` |
| `name` | `name` |
| `location` | `location` |
| `tuition` | `fees` |
| `programs` | `courses` |
| `rating` | `rating` (UI also uses for display; card shows acceptance/enrollment from static only today) |
| `type`, `ranking`, `acceptanceRate`, `enrollment` | Defaults or new columns |

**Critical:** Until API integration, `/colleges/[id]` only works for static ids, not DB cuids.

---

## 9. Home page behavior (`src/app/page.tsx`)

Client component. State:

```ts
type Filters = {
  type: string[]                    // "public", "private", etc.
  tuitionRange: [number, number]    // default [0, 500000]
  acceptanceRate: string            // "all" | "under-10" | "10-25" | "25-50" | "over-50"
  location: string                  // "all" | "north" | "south" | "west" | "east" | "central"
  ranking: string                   // "all" | "top-25" | "top-50" | "top-100"
}
```

Constants: `src/lib/constants.ts` — `TUITION_MIN`, `TUITION_MAX` (500000), `TUITION_STEP` (10000)

### Location region → state codes (India)

| Filter | State codes in `location` string |
|--------|----------------------------------|
| `north` | DL, HR, PB, UP, UK, JK, HP, CH |
| `south` | TN, KA, KL, AP, TS, PY |
| `west` | MH, RJ, GJ, GA |
| `east` | WB, OR, BH, JH, AS, SK, ML, MN, TR, NL |
| `central` | MP, CG |

### Sort options

`ranking` (default), `name`, `tuition-low`, `tuition-high`, `acceptance`

### Pagination

`ITEMS_PER_PAGE = 9` from `colleges-data.ts`

### Compare

- Max **4** colleges selected
- `CompareBar` fixed bottom; "Compare Now" disabled until 2+ selected
- Does not navigate to `/colleges/compare` yet

---

## 10. Shared libraries

| File | Role |
|------|------|
| `src/lib/prisma.ts` | Singleton PrismaClient + `PrismaPg` adapter (Prisma 7) |
| `src/lib/colleges-data.ts` | Static college list + `ITEMS_PER_PAGE` |
| `src/lib/constants.ts` | Tuition filter bounds |
| `src/lib/format.ts` | `formatNumber`, `formatCurrency` — **always use for INR display** (`en-US` locale prevents hydration bugs) |
| `src/lib/utils.ts` | `cn()` — clsx + tailwind-merge |

---

## 11. Components map

| Component | Path | Role |
|-----------|------|------|
| `Navbar` | `src/components/navbar.tsx` | Logo, Browse `/`, Compare `/colleges/compare` |
| `SearchBar` | `src/components/search-bar.tsx` | Text search (name, location, programs) |
| `FiltersSidebar` | `src/components/filters-sidebar.tsx` | Desktop filters |
| `MobileFilters` | `src/components/mobile-filters.tsx` | Sheet wrapper for filters |
| `CollegeCard` | `src/components/college-card.tsx` | Card + compare checkbox + link to detail |
| `CompareBar` | `src/components/compare-bar.tsx` | Sticky compare tray |
| `PaginationControls` | `src/components/pagination-controls.tsx` | Page navigation |

### UI kit (shadcn) — **actively typechecked**

`button`, `badge`, `card`, `checkbox`, `dialog`, `input`, `label`, `select`, `sheet`, `slider`

Many other files under `src/components/ui/` exist but are **excluded in `tsconfig.json`** to avoid build noise. Safe to use; may need deps or tsconfig include when adopted.

---

## 12. Styling & config

| File | Purpose |
|------|---------|
| `src/app/globals.css` | Tailwind v4 + CSS variables |
| `components.json` | shadcn config; aliases `@/components`, `@/lib`, `@/hooks` |
| `postcss.config.mjs` | Tailwind PostCSS |
| `next.config.ts` | Default (empty options) |

**Hydration rule:** Never use bare `number.toLocaleString()` in SSR/client shared UI. Use `formatNumber` / `formatCurrency` from `src/lib/format.ts`.

**Currency:** INR (₹). Tuition/filter amounts are in rupees (e.g. 250000 = ₹2.5L).

---

## 13. TypeScript notes

- `tsconfig.json` excludes unused shadcn UI files (see exclude list in repo)
- `ts-node` CommonJS override for Prisma seed only
- Strict mode enabled

---

## 14. Key dependencies (pinned in package.json)

### Core

| Package | Version |
|---------|---------|
| next | 16.2.6 |
| react / react-dom | 19.2.4 |
| typescript | ^5.9.3 |
| tailwindcss | ^4 |
| @tailwindcss/postcss | ^4 |

### Database

| Package | Version |
|---------|---------|
| prisma | ^7.8.0 |
| @prisma/client | ^7.8.0 |
| @prisma/adapter-pg | ^7.8.0 |
| pg | ^8.21.0 |
| dotenv | ^17.4.2 |

### UI / forms (installed; partial use)

| Package | Version |
|---------|---------|
| @radix-ui/react-* | various ^1.x–^2.x |
| class-variance-authority | ^0.7.1 |
| clsx | ^2.1.1 |
| tailwind-merge | ^3.6.0 |
| lucide-react | ^1.16.0 |
| @phosphor-icons/react | ^2.1.10 |
| shadcn | ^4.8.0 |
| next-themes | ^0.4.6 |
| react-hook-form | ^7.76.0 |
| zod | ^4.4.3 |
| zustand | ^5.0.13 |
| axios | ^1.16.1 |
| react-hot-toast | ^2.6.0 |

### Auth (not integrated)

| Package | Version |
|---------|---------|
| @clerk/nextjs | ^7.4.0 |

### Dev

| Package | Version |
|---------|---------|
| eslint | ^9 |
| eslint-config-next | 16.2.6 |
| ts-node | ^10.9.2 |
| @types/node | ^20.19.41 |
| @types/pg | ^8.20.0 |

---

## 15. Project structure

```
collegesearchplatform/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── prisma.config.ts
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Home / discovery
│   │   ├── globals.css
│   │   ├── colleges/
│   │   │   ├── page.tsx          # → redirect /
│   │   │   ├── [id]/page.tsx
│   │   │   └── compare/page.tsx
│   │   └── saved/page.tsx
│   ├── components/
│   │   ├── navbar.tsx
│   │   ├── college-card.tsx
│   │   ├── filters-sidebar.tsx
│   │   ├── search-bar.tsx
│   │   ├── compare-bar.tsx
│   │   ├── mobile-filters.tsx
│   │   ├── pagination-controls.tsx
│   │   └── ui/                   # shadcn components
│   └── lib/
│       ├── prisma.ts
│       ├── colleges-data.ts
│       ├── constants.ts
│       ├── format.ts
│       └── utils.ts
├── docs/
│   ├── PROJECT_CONTEXT.md        # This file
│   └── project-changes-summary.md
├── scripts/
│   └── generate-changes-pdf.mjs
├── .env                          # DATABASE_URL (gitignored)
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## 16. Development priorities (suggested)

1. **API + Prisma** — `GET /api/colleges`, replace static `collegesData` on home/detail
2. **Schema alignment** — Add `type`, `ranking`, `acceptanceRate`, `enrollment` to `College` OR drop from filters
3. **Clerk** — `middleware.ts`, sign-in, sync `User`, implement `/saved`
4. **Compare flow** — Pass selected ids to `/colleges/compare` (query or session)
5. **SavedCollege FK** — Relation to `College`, unique `[userId, collegeId]`
6. **Migrations** — Move from `db push` to `prisma migrate` for production
7. **Metadata** — Update `layout.tsx` title/description from "Create Next App" to UniScout

---

## 17. Known issues & constraints

- Home and detail pages use **static data**, not PostgreSQL
- Static ids (`"1"`) ≠ Prisma cuids — detail URLs break after DB switch unless mapper/slug added
- `@clerk/nextjs` installed but no `middleware.ts` or ClerkProvider
- `SavedCollege.collegeId` has no Prisma relation to `College`
- Compare page is a stub; CompareBar does not link to it
- Rankings nav link still `#` in navbar
- Importing `src/lib/prisma.ts` throws if `DATABASE_URL` missing (intentional)

---

## 18. Agent workflow checklist

When making changes:

1. Read this file + `prisma/schema.prisma` + affected page/component
2. Prefer `formatCurrency` for any fee display
3. Keep tuition bounds in sync: `constants.ts` + `filters-sidebar` + `page.tsx`
4. After schema change: `npx prisma generate` → `npx prisma db push` → update seed if needed
5. Run `npm run build` before considering task done
6. Do not commit `.env` or secrets
7. Minimize scope — match existing patterns (`"use client"` on interactive pages)

---

## 19. Related docs

| Document | Path |
|----------|------|
| Change log (May 2026 fixes) | `docs/project-changes-summary.md` |
| PDF change summary | `docs/project-changes-summary.pdf` |
| Default Next README | `README.md` (mostly boilerplate) |

---

*Last updated: May 22, 2026*
