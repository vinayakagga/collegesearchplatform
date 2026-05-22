import PDFDocument from "pdfkit"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..")
const outPath = path.join(root, "docs", "project-changes-summary.pdf")

const doc = new PDFDocument({ margin: 50, size: "A4" })
const stream = fs.createWriteStream(outPath)
doc.pipe(stream)

const title = "College Search Platform — Change Summary"
const date = "May 22, 2026"

function heading(text, size = 14) {
  doc.moveDown(0.6).font("Helvetica-Bold").fontSize(size).text(text, { continued: false })
  doc.moveDown(0.3)
}

function body(text) {
  doc.font("Helvetica").fontSize(10).text(text, { lineGap: 3 })
}

function bullet(text) {
  doc.font("Helvetica").fontSize(10).text(`• ${text}`, { indent: 12, lineGap: 2 })
}

doc.font("Helvetica-Bold").fontSize(20).text(title)
doc.moveDown(0.3)
doc.font("Helvetica").fontSize(11).fillColor("#444444").text(`Date: ${date}`)
doc.fillColor("#000000")
body(
  "Scope: Bug fixes (Prisma seed, React hydration), app consistency, routing, and build configuration."
)

heading("New Files", 13)
;[
  "src/lib/format.ts — formatNumber / formatCurrency (en-US locale, fixes hydration)",
  "src/lib/constants.ts — shared tuition min/max/step",
  "src/app/colleges/[id]/page.tsx — college detail page",
  "src/app/colleges/compare/page.tsx — compare placeholder",
  "src/app/saved/page.tsx — saved colleges placeholder",
].forEach(bullet)

heading("Database / Prisma", 13)
bullet("prisma/seed.ts — rewritten for current College schema; 6 colleges seeded")
bullet("src/lib/prisma.ts — Prisma 7 + @prisma/adapter-pg + DATABASE_URL")

heading("Home Page & Filters", 13)
bullet("src/app/page.tsx — Indian region filters; shared tuition constants")
bullet("src/components/filters-sidebar.tsx — formatCurrency; slider max ₹500,000; ₹ display")
bullet("src/components/college-card.tsx — ₹ tuition; View Details links to /colleges/[id]")

heading("Routing & Navigation", 13)
bullet("src/app/colleges/page.tsx — redirects to /")
bullet("src/components/navbar.tsx — Browse → /, Compare → /colleges/compare")

heading("Build & TypeScript", 13)
bullet("tsconfig.json — excluded unused shadcn UI from type-checking")
bullet("src/components/ui/calendar.tsx — removed invalid table class")
bullet("src/components/ui/chart.tsx — @ts-nocheck for recharts types")

heading("Dependencies Added", 13)
body(
  "Prisma: @prisma/adapter-pg, pg, dotenv, @types/pg. UI/build: next-themes, additional @radix-ui packages, sonner, cmdk, vaul, recharts, embla-carousel-react, react-day-picker, react-resizable-panels, input-otp, react-hook-form, @hookform/resolvers, zod."
)

heading("Not Changed", 13)
bullet("prisma/schema.prisma")
bullet("src/lib/colleges-data.ts (still powers the home page)")
bullet("src/app/layout.tsx")

heading("Issues Fixed", 13)
;[
  "Prisma seed TypeScript errors and Prisma 7 client setup",
  "Hydration mismatch (5,00,000 vs 500,000 on tuition labels)",
  "Tuition slider max vs default filter range",
  "Empty routes breaking production build",
  "US location filters not matching Indian colleges",
].forEach(bullet)

heading("Commands", 13)
body("npx prisma generate")
body("npx prisma db push")
body("npx prisma db seed")
body("npm run dev")
body("npm run build")

heading("Architecture Note", 13)
body(
  "The home page still uses static colleges-data.ts. The database is seeded and ready when you add API or server-side Prisma fetching."
)

doc.end()

stream.on("finish", () => {
  console.log(`PDF written to ${outPath}`)
})

stream.on("error", (err) => {
  console.error(err)
  process.exit(1)
})
