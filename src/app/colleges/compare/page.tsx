import Link from "next/link"

import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { collegesData } from "@/lib/colleges-data"
import { formatCurrency, formatNumber } from "@/lib/format"

interface ComparePageProps {
  searchParams: Promise<{ ids?: string }>
}

export default async function CompareCollegesPage({
  searchParams,
}: ComparePageProps) {
  const { ids } = await searchParams

  const selectedIds = ids ? ids.split(",") : []

  const colleges = collegesData.filter((college) =>
    selectedIds.includes(college.id.toString())
  )

  if (colleges.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="mx-auto max-w-lg px-4 py-24 text-center sm:px-6">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-lg border border-border bg-muted text-2xl">
            📊
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">No colleges selected</h1>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Select at least two colleges on the homepage to compare rankings, fees, and
            placements side by side.
          </p>
          <Button className="mt-8 rounded-lg px-5" asChild>
            <Link href="/">Back to browse</Link>
          </Button>
        </main>
      </div>
    )
  }

  const bestRanking = Math.min(...colleges.map((c) => c.ranking))
  const bestCampusLife = Math.max(...colleges.map((c) => c.campusLife || 0))
  const lowestTuition = Math.min(...colleges.map((c) => c.tuition))

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <header className="mb-10 flex flex-col gap-5 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Link
              href="/"
              className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              ← Back to search
            </Link>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Compare colleges
            </h1>
            <p className="mt-2 max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
              Side-by-side view of fees, placements, and campus life — highlights show the
              best value in each category.
            </p>
          </div>
          <span className="inline-flex w-fit items-center rounded-md border border-border bg-muted px-3 py-1.5 text-sm font-medium text-muted-foreground">
            Comparing {colleges.length} {colleges.length === 1 ? "college" : "colleges"}
          </span>
        </header>

        <section className="mb-10 rounded-xl border border-border bg-muted/40 p-6 sm:p-7">
          <h2 className="text-base font-semibold uppercase tracking-wider text-muted-foreground">
            Recommendation summary
          </h2>
          <div className="mt-5 space-y-4">
            {colleges.map((college) => (
              <p key={college.id} className="text-base leading-8 text-muted-foreground">
                <span className="font-semibold text-foreground">{college.name}</span> is ideal
                for students prioritizing {college.bestFor?.join(", ")}.
            ))}
          </div>
        </section>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {colleges.map((college) => (
            <article
              key={college.id}
              className="group overflow-hidden rounded-xl border border-border bg-card transition-[box-shadow,border-color] duration-200 hover:border-border hover:shadow-md"
            >
              <div className="relative h-52 overflow-hidden bg-muted">
                <img
                  src={college.image}
                  alt={college.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-card/70 to-transparent" />
                <div className="absolute right-3 top-3 rounded-md border border-border bg-background/95 px-2.5 py-1 text-sm font-medium tabular-nums backdrop-blur-sm">
                  ★ {college.rating}
                </div>
              </div>

              <div className="space-y-5 p-5 sm:p-6">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight">
                    {college.name}
                  </h2>
                  <p className="mt-2 text-base text-muted-foreground">📍 {college.location}</p>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Best for
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {college.bestFor?.map((item) => (
                      <span
                        key={item}
                        className="rounded-md bg-muted px-2.5 py-1 text-sm font-medium text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="divide-y divide-border rounded-lg border border-border bg-muted/30">
                  <MetricRow
                    label="Ranking"
                    value={`#${college.ranking}`}
                    highlight={college.ranking === bestRanking}
                    highlightIcon="🏆"
                  />
                  <MetricRow
                    label="Tuition"
                    value={formatCurrency(college.tuition)}
                    highlight={college.tuition === lowestTuition}
                    highlightIcon="💰"
                  />
                  <MetricRow label="Avg package" value={college.averagePackage} />
                  <MetricRow label="Highest package" value={college.highestPackage} />
                  <MetricRow
                    label="Campus life"
                    value={`${college.campusLife} / 5`}
                    highlight={college.campusLife === bestCampusLife}
                    highlightIcon="✦"
                  />
                  <MetricRow
                    label="Enrollment"
                    value={formatNumber(college.enrollment)}
                  />
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Programs
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {college.programs?.map((program) => (
                      <span
                        key={program}
                        className="rounded-md border border-border bg-background px-2.5 py-1 text-sm font-medium"
                      >
                        {program}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Top recruiters
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {college.topRecruiters?.map((company) => (
                      <span
                        key={company}
                        className="rounded-md bg-muted px-2.5 py-1 text-sm font-medium text-muted-foreground"
                      >
                        {company}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}

function MetricRow({
  label,
  value,
  highlight,
  highlightIcon,
}: {
  label: string
  value: string
  highlight?: boolean
  highlightIcon?: string
}) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3 text-base">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={`flex items-center gap-2 font-semibold tabular-nums ${
          highlight ? "text-foreground" : ""
        }`}
      >
        {value}
        {highlight && highlightIcon && (
          <span className="text-lg" aria-hidden>
            {highlightIcon}
          </span>
        )}
      </span>
    </div>
  )
}
