"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { TUITION_MAX, TUITION_MIN, TUITION_STEP } from "@/lib/constants"
import { formatCurrency } from "@/lib/format"
import { X } from "lucide-react"

interface FiltersProps {
  filters: {
    type: string[]
    tuitionRange: [number, number]
    acceptanceRate: string
    location: string
    ranking: string
  }
  onFilterChange: (key: string, value: unknown) => void
  onClearFilters: () => void
}

const schoolTypes = [
  { id: "public", label: "Public University" },
  { id: "private", label: "Private University" },
  { id: "liberal-arts", label: "Liberal Arts College" },
  { id: "community", label: "Community College" },
  { id: "technical", label: "Technical Institute" },
]

const locations = [
  { value: "all", label: "All Locations" },
  { value: "north", label: "North India" },
  { value: "south", label: "South India" },
  { value: "west", label: "West India" },
  { value: "east", label: "East India" },
  { value: "central", label: "Central India" },
]

const rankings = [
  { value: "all", label: "All Rankings" },
  { value: "top-25", label: "Top 25" },
  { value: "top-50", label: "Top 50" },
  { value: "top-100", label: "Top 100" },
]

const acceptanceRates = [
  { value: "all", label: "Any Acceptance Rate" },
  { value: "under-10", label: "Under 10%" },
  { value: "10-25", label: "10% - 25%" },
  { value: "25-50", label: "25% - 50%" },
  { value: "over-50", label: "Over 50%" },
]

export function FiltersSidebar({ filters, onFilterChange, onClearFilters }: FiltersProps) {
  const handleTypeChange = (typeId: string, checked: boolean) => {
    const newTypes = checked
      ? [...filters.type, typeId]
      : filters.type.filter((t) => t !== typeId)
    onFilterChange("type", newTypes)
  }

  const activeFiltersCount = 
    filters.type.length + 
    (filters.location !== "all" ? 1 : 0) + 
    (filters.ranking !== "all" ? 1 : 0) + 
    (filters.acceptanceRate !== "all" ? 1 : 0) +
    (filters.tuitionRange[0] > TUITION_MIN || filters.tuitionRange[1] < TUITION_MAX ? 1 : 0)

  return (
    <aside className="w-full space-y-6 rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">Filters</h3>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="h-auto gap-1.5 px-2 py-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3" />
            Clear all ({activeFiltersCount})
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <div className="space-y-3">
          <Label className="text-sm font-medium text-muted-foreground">School Type</Label>
          <div className="space-y-2.5">
            {schoolTypes.map((type) => (
              <div key={type.id} className="flex items-center gap-2.5">
                <Checkbox
                  id={type.id}
                  checked={filters.type.includes(type.id)}
                  onCheckedChange={(checked) =>
                    handleTypeChange(type.id, checked as boolean)
                  }
                />
                <Label
                  htmlFor={type.id}
                  className="text-base font-normal text-foreground/80 cursor-pointer"
                >
                  {type.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-border/50" />

        <div className="space-y-3">
          <Label className="text-sm font-medium text-muted-foreground">Location</Label>
          <Select
            value={filters.location}
            onValueChange={(value) => onFilterChange("location", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc.value} value={loc.value}>
                  {loc.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="h-px bg-border/50" />

        <div className="space-y-3">
          <Label className="text-sm font-medium text-muted-foreground">Ranking</Label>
          <Select
            value={filters.ranking}
            onValueChange={(value) => onFilterChange("ranking", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select ranking" />
            </SelectTrigger>
            <SelectContent>
              {rankings.map((rank) => (
                <SelectItem key={rank.value} value={rank.value}>
                  {rank.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="h-px bg-border/50" />

        <div className="space-y-3">
          <Label className="text-sm font-medium text-muted-foreground">Acceptance Rate</Label>
          <Select
            value={filters.acceptanceRate}
            onValueChange={(value) => onFilterChange("acceptanceRate", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select acceptance rate" />
            </SelectTrigger>
            <SelectContent>
              {acceptanceRates.map((rate) => (
                <SelectItem key={rate.value} value={rate.value}>
                  {rate.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="h-px bg-border/50" />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-muted-foreground">Tuition Range</Label>
            <span className="text-sm text-muted-foreground">
              {formatCurrency(filters.tuitionRange[0])} - {formatCurrency(filters.tuitionRange[1])}
            </span>
          </div>
          <Slider
            value={filters.tuitionRange}
            onValueChange={(value) => onFilterChange("tuitionRange", value)}
            min={TUITION_MIN}
            max={TUITION_MAX}
            step={TUITION_STEP}
            className="py-2"
          />
        </div>
      </div>
    </aside>
  )
}
