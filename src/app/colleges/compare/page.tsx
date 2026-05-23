import Link from "next/link"

import { collegesData } from "@/lib/colleges-data"
import { formatCurrency, formatNumber } from "@/lib/format"

interface ComparePageProps {
  searchParams: Promise<{ ids?: string }>
}

export default async function CompareCollegesPage({
  searchParams,
}: ComparePageProps) {

  const { ids } = await searchParams

  const selectedIds = ids
    ? ids.split(",")
    : []

  const colleges = collegesData.filter((college) =>
    selectedIds.includes(college.id.toString())
  )

  if (colleges.length === 0) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-20 text-center">

        <div className="mb-4 text-5xl">
          📊
        </div>

        <h1 className="text-3xl font-bold">
          No Colleges Selected
        </h1>

        <p className="mt-3 text-muted-foreground">
          Select at least two colleges to compare.
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-primary px-5 py-3 text-primary-foreground"
        >
          Back to Browse
        </Link>

      </main>
    )
  }

  // Winner Logic
  const bestRanking = Math.min(
    ...colleges.map((c) => c.ranking)
  )

  const bestCampusLife = Math.max(
    ...colleges.map((c) => c.campusLife || 0)
  )

  const lowestTuition = Math.min(
    ...colleges.map((c) => c.tuition)
  )

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">

      {/* Header */}
      <div className="mb-10 flex flex-col gap-4 border-b pb-6 md:flex-row md:items-center md:justify-between">

        <div>

          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to Search
          </Link>

          <h1 className="mt-3 text-4xl font-bold tracking-tight">
            Compare Colleges
          </h1>

        </div>

        <div className="rounded-full border bg-secondary/40 px-4 py-2 text-sm font-medium">
          Comparing {colleges.length} Colleges
        </div>

      </div>

      {/* Recommendation Summary */}
      <div className="mb-10 rounded-3xl border bg-secondary/20 p-6">

        <h2 className="text-2xl font-semibold">
          Recommendation Summary
        </h2>

        <div className="mt-5 space-y-3 text-muted-foreground">

          {colleges.map((college) => (
            <p key={college.id}>

              <span className="font-semibold text-foreground">
                {college.name}
              </span>{" "}

              is ideal for students prioritizing{" "}

              {college.bestFor?.join(", ")}.

            </p>
          ))}

        </div>

      </div>

      {/* Compare Grid */}
      <div className="grid gap-6 lg:grid-cols-3">

        {colleges.map((college) => (

          <div
            key={college.id}
            className="overflow-hidden rounded-3xl border bg-card shadow-sm"
          >

            {/* Image */}
            <div className="relative h-52">

              <img
                src={college.image}
                alt={college.name}
                className="h-full w-full object-cover"
              />

              <div className="absolute right-4 top-4 rounded-xl bg-background/95 px-3 py-1 text-sm font-semibold shadow-sm">
                ⭐ {college.rating}
              </div>

            </div>

            <div className="space-y-6 p-6">

              {/* Header */}
              <div>

                <h2 className="text-2xl font-bold">
                  {college.name}
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                  📍 {college.location}
                </p>

              </div>

              {/* Best For */}
              <div>

                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Best For
                </h3>

                <div className="flex flex-wrap gap-2">

                  {college.bestFor?.map((item) => (
                    <div
                      key={item}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium"
                    >
                      ⭐ {item}
                    </div>
                  ))}

                </div>

              </div>

              {/* Metrics */}
              <div className="space-y-4 border-t pt-5">

                {/* Ranking */}
                <div className="flex items-center justify-between">

                  <span className="text-muted-foreground">
                    Ranking
                  </span>

                  <div className="flex items-center gap-2 font-semibold">

                    <span>
                      #{college.ranking}
                    </span>

                    {college.ranking === bestRanking && (
                      <span className="text-green-500">
                        🏆
                      </span>
                    )}

                  </div>

                </div>

                {/* Tuition */}
                <div className="flex items-center justify-between">

                  <span className="text-muted-foreground">
                    Tuition
                  </span>

                  <div className="flex items-center gap-2 font-semibold">

                    <span>
                      {formatCurrency(college.tuition)}
                    </span>

                    {college.tuition === lowestTuition && (
                      <span className="text-green-500">
                        💰
                      </span>
                    )}

                  </div>

                </div>

                {/* Average Package */}
                <div className="flex items-center justify-between">

                  <span className="text-muted-foreground">
                    Avg Package
                  </span>

                  <span className="font-semibold">
                    {college.averagePackage}
                  </span>

                </div>

                {/* Highest Package */}
                <div className="flex items-center justify-between">

                  <span className="text-muted-foreground">
                    Highest Package
                  </span>

                  <span className="font-semibold">
                    {college.highestPackage}
                  </span>

                </div>

                {/* Campus Life */}
                <div className="flex items-center justify-between">

                  <span className="text-muted-foreground">
                    Campus Life
                  </span>

                  <div className="flex items-center gap-2 font-semibold">

                    <span>
                      {college.campusLife} / 5
                    </span>

                    {college.campusLife === bestCampusLife && (
                      <span className="text-green-500">
                        🎉
                      </span>
                    )}

                  </div>

                </div>

                {/* Enrollment */}
                <div className="flex items-center justify-between">

                  <span className="text-muted-foreground">
                    Enrollment
                  </span>

                  <span className="font-semibold">
                    {formatNumber(college.enrollment)}
                  </span>

                </div>

              </div>

              {/* Programs */}
              <div>

                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Programs
                </h3>

                <div className="flex flex-wrap gap-2">

                  {college.programs?.map((program) => (
                    <div
                      key={program}
                      className="rounded-xl border px-3 py-1 text-xs font-medium"
                    >
                      {program}
                    </div>
                  ))}

                </div>

              </div>

              {/* Recruiters */}
              <div>

                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Top Recruiters
                </h3>

                <div className="flex flex-wrap gap-2">

                  {college.topRecruiters?.map((company) => (
                    <div
                      key={company}
                      className="rounded-xl bg-secondary/40 px-3 py-1 text-xs font-medium"
                    >
                      {company}
                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </main>
  )
}