import Link from "next/link"
import { notFound } from "next/navigation"
import { MapPin, Star } from "lucide-react"

import { Navbar } from "@/components/navbar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { collegesData } from "@/lib/colleges-data"
import { formatCurrency, formatNumber } from "@/lib/format"

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function CollegeDetailPage({
  params,
}: PageProps) {

  const { id } = await params

  const college = collegesData.find(
    (c) => c.id === id
  )

  if (!college) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">

      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">

        <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2 text-muted-foreground">
          <Link href="/">← Back to search</Link>
        </Button>

        <div className="overflow-hidden rounded-xl border border-border bg-card">

          <div className="relative h-72 bg-cover bg-center sm:h-80">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${college.image})` }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-card via-card/20 to-transparent" />
          </div>

          <div className="space-y-10 p-6 sm:p-8">

            {/* HERO */}
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

              <div>

                <div className="flex flex-wrap items-center gap-3">

                  <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    {college.name}
                  </h1>

                  <Badge
                    variant="outline"
                    className="capitalize font-normal"
                  >
                    {college.type}
                  </Badge>

                </div>

                <p className="mt-3 flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                  {college.location}
                </p>

                <div className="mt-4 flex items-center gap-2">

                  <Star className="h-4 w-4 fill-amber-400/80 text-amber-400/80" />

                  <span className="text-base font-medium tabular-nums">
                    {college.rating} / 5
                  </span>

                </div>

                {/* Best For */}
                <div className="mt-6 flex flex-wrap gap-3">

                  {college.bestFor.map((item) => (
                    <Badge
                      key={item}
                      variant="secondary"
                      className="rounded-md px-2.5 py-0.5 text-sm font-normal"
                    >
                      {item}
                    </Badge>
                  ))}

                </div>

              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button className="rounded-lg">Compare College</Button>
                <Button variant="outline" className="rounded-lg">
                  Save College
                </Button>
              </div>

            </div>

            <section className="border-t border-border pt-8">
            <h2 className="text-base font-semibold uppercase tracking-wider text-muted-foreground">
                Quick insights
              </h2>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                <div className="rounded-lg border border-border bg-muted/40 p-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Average Package
                  </p>

                  <p className="mt-1.5 text-xl font-semibold tabular-nums">
                    {college.averagePackage}
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-muted/40 p-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Highest Package
                  </p>

                  <p className="mt-1.5 text-xl font-semibold tabular-nums">
                    {college.highestPackage}
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-muted/40 p-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Campus Life
                  </p>

                  <p className="mt-1.5 text-xl font-semibold tabular-nums">
                    {college.campusLife} / 5
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-muted/40 p-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Ranking
                  </p>

                  <p className="mt-1.5 text-xl font-semibold tabular-nums">
                    #{college.ranking}
                  </p>
                </div>

              </div>

            </section>

            <section className="border-t border-border pt-8">
              <h2 className="text-base font-semibold uppercase tracking-wider text-muted-foreground">
                About the college
              </h2>
              <p className="mt-3 max-w-3xl text-[16px] leading-7 text-muted-foreground">
                {college.description}
              </p>
            </section>

            <section className="border-t border-border pt-8">
              <h2 className="text-base font-semibold uppercase tracking-wider text-muted-foreground">
                Academic information
              </h2>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">

                <div className="rounded-lg border border-border bg-muted/40 p-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Annual Tuition
                  </p>

                  <p className="mt-2 text-xl font-semibold">
                    {formatCurrency(college.tuition)}
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-muted/40 p-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Acceptance Rate
                  </p>

                  <p className="mt-2 text-xl font-semibold">
                    {college.acceptanceRate}%
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-muted/40 p-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Student Enrollment
                  </p>

                  <p className="mt-2 text-xl font-semibold">
                    {formatNumber(college.enrollment)}
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-muted/40 p-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Student Rating
                  </p>

                  <p className="mt-2 text-xl font-semibold">
                    {college.rating} / 5
                  </p>
                </div>

              </div>

            </section>

            <section className="border-t border-border pt-8">
              <h2 className="text-base font-semibold uppercase tracking-wider text-muted-foreground">
                Programs offered
              </h2>

              <div className="mt-5 flex flex-wrap gap-3">

                {college.programs.map((program) => (
                    <Badge
                      key={program}
                      variant="outline"
                      className="rounded-md px-3 py-1 text-sm font-normal"
                    >
                      {program}
                    </Badge>
                ))}

              </div>

            </section>

            <section className="border-t border-border pt-8">
              <h2 className="text-base font-semibold uppercase tracking-wider text-muted-foreground">
                Top recruiters
              </h2>

              <div className="mt-4 flex flex-wrap gap-2">
                {college.topRecruiters.map((company) => (
                  <div
                    key={company}
                    className="rounded-md border border-border bg-muted/40 px-3 py-2 text-base font-medium"
                  >
                    {company}
                  </div>
                ))}
              </div>
            </section>

            <section className="border-t border-border pt-8">
              <h2 className="text-base font-semibold uppercase tracking-wider text-muted-foreground">
                Student reviews
              </h2>

              <div className="mt-4 space-y-3">

                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <div className="flex items-center justify-between">

                    <p className="font-semibold">
                      Aarav Sharma
                    </p>

                    <Badge>
                      5.0
                    </Badge>

                  </div>

                  <p className="mt-3 text-sm text-muted-foreground">
                    Amazing peer group and strong placement opportunities.
                    The coding culture here pushes students to grow rapidly.
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <div className="flex items-center justify-between">

                    <p className="font-semibold">
                      Priya Mehta
                    </p>

                    <Badge>
                      4.8
                    </Badge>

                  </div>

                  <p className="mt-3 text-muted-foreground">
                    Great campus life and internship opportunities.
                    Faculty and seniors are extremely supportive.
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-muted/30 p-4">
                  <div className="flex items-center justify-between">

                    <p className="font-semibold">
                      Rohan Verma
                    </p>

                    <Badge>
                      4.7
                    </Badge>

                  </div>

                  <p className="mt-3 text-muted-foreground">
                    Excellent exposure to hackathons, startups,
                    and real-world engineering projects.
                  </p>
                </div>

              </div>

            </section>

          </div>

        </div>

      </main>

    </div>
  )
}