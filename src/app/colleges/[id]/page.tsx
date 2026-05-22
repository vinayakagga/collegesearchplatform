import Link from "next/link"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { collegesData } from "@/lib/colleges-data"
import { formatCurrency } from "@/lib/format"
import { MapPin } from "lucide-react"

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function CollegeDetailPage({ params }: PageProps) {
  const { id } = await params
  const college = collegesData.find((c) => c.id === id)

  if (!college) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link href="/">← Back to search</Link>
        </Button>

        <div className="overflow-hidden rounded-xl border border-border/50 bg-card">
          <div
            className="h-56 bg-cover bg-center"
            style={{ backgroundImage: `url(${college.image})` }}
          />
          <div className="space-y-6 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">{college.name}</h1>
                <p className="mt-2 flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {college.location}
                </p>
              </div>
              <Badge variant="secondary">#{college.ranking} ranked</Badge>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-secondary/50 p-4">
                <p className="text-xs text-muted-foreground">Annual tuition</p>
                <p className="text-lg font-semibold">{formatCurrency(college.tuition)}</p>
              </div>
              <div className="rounded-lg bg-secondary/50 p-4">
                <p className="text-xs text-muted-foreground">Acceptance rate</p>
                <p className="text-lg font-semibold">{college.acceptanceRate}%</p>
              </div>
              <div className="rounded-lg bg-secondary/50 p-4">
                <p className="text-xs text-muted-foreground">Rating</p>
                <p className="text-lg font-semibold">{college.rating} / 5</p>
              </div>
              <div className="rounded-lg bg-secondary/50 p-4">
                <p className="text-xs text-muted-foreground">Enrollment</p>
                <p className="text-lg font-semibold">{college.enrollment.toLocaleString("en-US")}</p>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-medium text-muted-foreground">Programs</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {college.programs.map((program) => (
                  <Badge key={program} variant="outline">
                    {program}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
