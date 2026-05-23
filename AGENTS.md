# Agent instructions — College Search Platform (UniScout)

Read **`docs/PROJECT_CONTEXT.md`** before coding. It contains routes, schema, versions, env vars, recommended APIs, data-model gaps, and conventions.

## Must-know

- **Stack:** Next.js 16 App Router, React 19, Tailwind 4, shadcn/ui.
- **Data:** Static `src/lib/colleges-data.ts` only (no database in MVP deploy).
- **Display:** Use `formatCurrency` / `formatNumber` from `src/lib/format.ts` (hydration-safe).
- **No API routes yet** — see §6 in PROJECT_CONTEXT for suggested endpoints.

## Commands

```bash
npm run dev          # http://localhost:3000
npm run build
```

## Do not

- Commit `.env` or expose secrets
- Use bare `toLocaleString()` in shared UI
Full context: [docs/PROJECT_CONTEXT.md](docs/PROJECT_CONTEXT.md)
