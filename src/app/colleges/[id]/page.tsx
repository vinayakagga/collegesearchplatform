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

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">

        {/* Back Button */}
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="mb-6"
        >
          <Link href="/">
            ← Back to search
          </Link>
        </Button>

        {/* Main Card */}
        <div className="overflow-hidden rounded-3xl border border-border/50 bg-card shadow-sm">

          {/* Hero Image */}
          <div
            className="h-72 bg-cover bg-center"
            style={{
              backgroundImage: `url(${college.image})`,
            }}
          />

          <div className="space-y-10 p-8">

            {/* HERO */}
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

              <div>

                <div className="flex flex-wrap items-center gap-3">

                  <h1 className="text-4xl font-bold tracking-tight">
                    {college.name}
                  </h1>

                  <Badge
                    variant="secondary"
                    className="capitalize"
                  >
                    {college.type}
                  </Badge>

                </div>

                <p className="mt-3 flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {college.location}
                </p>

                <div className="mt-4 flex items-center gap-2">

                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />

                  <span className="font-medium">
                    {college.rating} / 5
                  </span>

                </div>

                {/* Best For */}
                <div className="mt-6 flex flex-wrap gap-2">

                  {college.bestFor.map((item) => (
                    <Badge
                      key={item}
                      className="rounded-full px-3 py-1 text-sm"
                    >
                      ⭐ {item}
                    </Badge>
                  ))}

                </div>

              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3">

                <Button>
                  Compare College
                </Button>

                <Button variant="outline">
                  Save College
                </Button>

              </div>

            </div>

            {/* Quick Insights */}
            <div>

              <h2 className="mb-5 text-2xl font-semibold">
                Quick Insights
              </h2>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                <div className="rounded-2xl border bg-secondary/30 p-5">
                  <p className="text-sm text-muted-foreground">
                    Average Package
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {college.averagePackage}
                  </p>
                </div>

                <div className="rounded-2xl border bg-secondary/30 p-5">
                  <p className="text-sm text-muted-foreground">
                    Highest Package
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {college.highestPackage}
                  </p>
                </div>

                <div className="rounded-2xl border bg-secondary/30 p-5">
                  <p className="text-sm text-muted-foreground">
                    Campus Life
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    {college.campusLife} / 5
                  </p>
                </div>

                <div className="rounded-2xl border bg-secondary/30 p-5">
                  <p className="text-sm text-muted-foreground">
                    Ranking
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    #{college.ranking}
                  </p>
                </div>

              </div>

            </div>

            {/* About */}
            <div>

              <h2 className="text-2xl font-semibold">
                About the College
              </h2>

              <p className="mt-4 leading-8 text-muted-foreground">
                {college.description}
              </p>

            </div>

            {/* Academic Information */}
            <div>

              <h2 className="text-2xl font-semibold">
                Academic Information
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl border p-5">
                  <p className="text-sm text-muted-foreground">
                    Annual Tuition
                  </p>

                  <p className="mt-2 text-xl font-semibold">
                    {formatCurrency(college.tuition)}
                  </p>
                </div>

                <div className="rounded-2xl border p-5">
                  <p className="text-sm text-muted-foreground">
                    Acceptance Rate
                  </p>

                  <p className="mt-2 text-xl font-semibold">
                    {college.acceptanceRate}%
                  </p>
                </div>

                <div className="rounded-2xl border p-5">
                  <p className="text-sm text-muted-foreground">
                    Student Enrollment
                  </p>

                  <p className="mt-2 text-xl font-semibold">
                    {formatNumber(college.enrollment)}
                  </p>
                </div>

                <div className="rounded-2xl border p-5">
                  <p className="text-sm text-muted-foreground">
                    Student Rating
                  </p>

                  <p className="mt-2 text-xl font-semibold">
                    {college.rating} / 5
                  </p>
                </div>

              </div>

            </div>

            {/* Programs */}
            <div>

              <h2 className="text-2xl font-semibold">
                Programs Offered
              </h2>

              <div className="mt-5 flex flex-wrap gap-3">

                {college.programs.map((program) => (
                  <Badge
                    key={program}
                    variant="outline"
                    className="rounded-full px-4 py-2 text-sm"
                  >
                    {program}
                  </Badge>
                ))}

              </div>

            </div>

            {/* Recruiters */}
            <div>

              <h2 className="text-2xl font-semibold">
                Top Recruiters
              </h2>

              <div className="mt-5 flex flex-wrap gap-3">

                {college.topRecruiters.map((company) => (
                  <div
                    key={company}
                    className="rounded-2xl border bg-secondary/20 px-5 py-3 font-medium"
                  >
                    {company}
                  </div>
                ))}

              </div>

            </div>

            {/* Student Reviews */}
            <div>

              <h2 className="text-2xl font-semibold">
                Student Reviews
              </h2>

              <div className="mt-5 space-y-4">

                <div className="rounded-2xl border p-5">
                  <div className="flex items-center justify-between">

                    <p className="font-semibold">
                      Aarav Sharma
                    </p>

                    <Badge>
                      5.0
                    </Badge>

                  </div>

                  <p className="mt-3 text-muted-foreground">
                    Amazing peer group and strong placement opportunities.
                    The coding culture here pushes students to grow rapidly.
                  </p>
                </div>

                <div className="rounded-2xl border p-5">
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

                <div className="rounded-2xl border p-5">
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

            </div>

          </div>

        </div>

      </main>

    </div>
  )
}