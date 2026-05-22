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
    <Card className="group relative overflow-hidden border-border/50 bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <div className="relative h-40 overflow-hidden bg-secondary">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ 
            backgroundImage: `url(${college.image})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        
        {college.featured && (
          <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
        
        <div className="absolute right-3 top-3 flex items-center gap-2 rounded-full bg-background/80 px-2.5 py-1.5 backdrop-blur-sm">
          <Checkbox
            id={`compare-${college.id}`}
            checked={isSelected}
            onCheckedChange={() => onToggleCompare(college.id)}
            className="h-4 w-4"
          />
          <label
            htmlFor={`compare-${college.id}`}
            className="cursor-pointer text-xs font-medium"
          >
            Compare
          </label>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="line-clamp-1 text-lg font-semibold leading-tight text-balance">
              {college.name}
            </h3>
            <Badge variant="secondary" className="shrink-0 text-xs">
              #{college.ranking}
            </Badge>
          </div>
          <div className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span>{college.location}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Acceptance</p>
              <p className="text-sm font-medium">{college.acceptanceRate}%</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Tuition</p>
              <p className="text-sm font-medium">₹{(college.tuition / 1000).toFixed(0)}k</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-2">
            <Users className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Enrollment</p>
              <p className="text-sm font-medium">{(college.enrollment / 1000).toFixed(1)}k</p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Type</p>
              <p className="text-sm font-medium capitalize">{college.type}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {college.programs.slice(0, 3).map((program) => (
            <Badge key={program} variant="outline" className="text-xs font-normal">
              {program}
            </Badge>
          ))}
          {college.programs.length > 3 && (
            <Badge variant="outline" className="text-xs font-normal text-muted-foreground">
              +{college.programs.length - 3} more
            </Badge>
          )}
        </div>

        <Button className="w-full" variant="secondary" asChild>
          <Link href={`/colleges/${college.id}`}>View Details</Link>
        </Button>
      </div>
    </Card>
  )
}
