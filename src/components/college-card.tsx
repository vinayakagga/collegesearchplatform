"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { MapPin, Users, DollarSign, TrendingUp, BookOpen } from "lucide-react"

export interface College {
  id: string
  name: string
  location: string
  type: string
  ranking: number
  acceptanceRate: number
  tuition: number
  enrollment: number
  image: string
  featured?: boolean
  programs: string[]
}

interface CollegeCardProps {
  college: College
  isSelected: boolean
  onToggleCompare: (id: string) => void
}

export function CollegeCard({ college, isSelected, onToggleCompare }: CollegeCardProps) {
  return (
    <Card
      className={`group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        isSelected ? "border-primary/40 ring-1 ring-primary/25" : ""
      }`}
    >
      <div className="relative aspect-4/3 w-full overflow-hidden bg-secondary">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.02]"
          style={{
            backgroundImage: `url(${college.image})`,
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
        
        {college.featured && (
          <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
        
        <div className="absolute right-3 top-3 rounded-full border border-border/80 bg-background/80 px-3 py-1.5 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur-sm">
          <Checkbox
            id={`compare-${college.id}`}
            checked={isSelected}
            onCheckedChange={() => onToggleCompare(college.id)}
            className="mr-2 h-4 w-4"
          />
          <label
            htmlFor={`compare-${college.id}`}
            className="cursor-pointer text-sm font-medium"
          >
            Compare
          </label>
        </div>
      </div>

      <div className="space-y-5 p-6">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <h3 className="line-clamp-1 text-xl font-semibold tracking-tight leading-snug">
              {college.name}
            </h3>
            <Badge variant="secondary" className="shrink-0 text-sm font-semibold">
              #{college.ranking}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{college.location}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 rounded-lg bg-muted/60 px-4 py-3">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Acceptance</p>
              <p className="text-lg font-semibold tracking-tight">{college.acceptanceRate}%</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-muted/60 px-4 py-3">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Tuition</p>
              <p className="text-lg font-semibold tracking-tight">₹{(college.tuition / 1000).toFixed(0)}k</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-muted/60 px-4 py-3">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Enrollment</p>
              <p className="text-lg font-semibold tracking-tight">{(college.enrollment / 1000).toFixed(1)}k</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-muted/60 px-4 py-3">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Type</p>
              <p className="text-lg font-semibold tracking-tight capitalize">{college.type}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {college.programs.slice(0, 3).map((program) => (
            <span
              key={program}
              className="rounded-full bg-muted/60 px-2.5 py-1 text-sm font-medium text-muted-foreground"
            >
              {program}
            </span>
          ))}
          {college.programs.length > 3 && (
            <span className="rounded-full bg-muted/60 px-2.5 py-1 text-sm font-medium text-muted-foreground">
              +{college.programs.length - 3} more
            </span>
          )}
        </div>

        <Button className="w-full rounded-lg" variant="outline" asChild>
          <Link href={`/colleges/${college.id}`}>View Details</Link>
        </Button>
      </div>
    </Card>
  )
}
