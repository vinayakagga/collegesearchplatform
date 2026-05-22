"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { SlidersHorizontal } from "lucide-react"
import { FiltersSidebar } from "./filters-sidebar"

interface MobileFiltersProps {
  filters: {
    type: string[]
    tuitionRange: [number, number]
    acceptanceRate: string
    location: string
    ranking: string
  }
  onFilterChange: (key: string, value: unknown) => void
  onClearFilters: () => void
  activeCount: number
}

export function MobileFilters({ filters, onFilterChange, onClearFilters, activeCount }: MobileFiltersProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="gap-2 lg:hidden">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {activeCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[320px] overflow-y-auto bg-background p-0">
        <SheetHeader className="border-b border-border/50 px-5 py-4">
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="p-4">
          <FiltersSidebar
            filters={filters}
            onFilterChange={onFilterChange}
            onClearFilters={onClearFilters}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}
