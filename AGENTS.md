# Agent instructions — College Search Platform (UniScout)

Read **`docs/PROJECT_CONTEXT.md`** before coding. It contains routes, schema, versions, env vars, recommended APIs, data-model gaps, and conventions.

## Must-know

- **Stack:** Next.js 16 App Router, React 19, Prisma 7 + PostgreSQL (`@prisma/adapter-pg`), Tailwind 4, shadcn/ui.
- **Data today:** Home/detail use static `src/lib/colleges-data.ts`, not the database.
- **DB:** `DATABASE_URL` required; client in `src/lib/prisma.ts`; seed via `npx prisma db seed`.
- **Display:** Use `formatCurrency` / `formatNumber` from `src/lib/format.ts` (hydration-safe).
- **No API routes yet** — see §6 in PROJECT_CONTEXT for suggested endpoints.

## Commands

```bash
npm run dev          # http://localhost:3000
npm run build
npx prisma generate
npx prisma db push
npx prisma db seed
```

## Do not

- Commit `.env` or expose secrets
- Use bare `toLocaleString()` in shared UI
- Assume UI college `id` matches Prisma `cuid` without a migration plan

Full context: [docs/PROJECT_CONTEXT.md](docs/PROJECT_CONTEXT.md)
