"use client"

import { useState, useMemo } from "react"
import { Navbar } from "@/components/navbar"
import { SearchBar } from "@/components/search-bar"
import { FiltersSidebar } from "@/components/filters-sidebar"
import { CollegeCard } from "@/components/college-card"
import { CompareBar } from "@/components/compare-bar"
import { PaginationControls } from "@/components/pagination-controls"
import { MobileFilters } from "@/components/mobile-filters"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DEFAULT_TUITION_RANGE, TUITION_MAX } from "@/lib/constants"
import { collegesData, ITEMS_PER_PAGE } from "@/lib/colleges-data"

type Filters = {
  type: string[]
  tuitionRange: [number, number]
  acceptanceRate: string
  location: string
  ranking: string
}

const defaultFilters: Filters = {
  type: [],
  tuitionRange: DEFAULT_TUITION_RANGE,
  acceptanceRate: "all",
  location: "all",
  ranking: "all",
}

export default function CollegeDiscoveryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<Filters>(defaultFilters)
  const [sortBy, setSortBy] = useState("ranking")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCollegeIds, setSelectedCollegeIds] = useState<string[]>([])

  const handleFilterChange = (key: string, value: unknown) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
    setCurrentPage(1)
  }

  const handleClearFilters = () => {
    setFilters(defaultFilters)
    setCurrentPage(1)
  }

  const activeFiltersCount = 
    filters.type.length + 
    (filters.location !== "all" ? 1 : 0) + 
    (filters.ranking !== "all" ? 1 : 0) + 
    (filters.acceptanceRate !== "all" ? 1 : 0) +
    (filters.tuitionRange[0] > 0 || filters.tuitionRange[1] < TUITION_MAX ? 1 : 0)

  const filteredColleges = useMemo(() => {
    let result = [...collegesData]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (college) =>
          college.name.toLowerCase().includes(query) ||
          college.location.toLowerCase().includes(query) ||
          college.programs.some((p) => p.toLowerCase().includes(query))
      )
    }

    // Type filter
    if (filters.type.length > 0) {
      result = result.filter((college) => filters.type.includes(college.type))
    }

    // Tuition filter
    result = result.filter(
      (college) =>
        college.tuition >= filters.tuitionRange[0] &&
        college.tuition <= filters.tuitionRange[1]
    )

    // Acceptance rate filter
    if (filters.acceptanceRate !== "all") {
      result = result.filter((college) => {
        switch (filters.acceptanceRate) {
          case "under-10":
            return college.acceptanceRate < 10
          case "10-25":
            return college.acceptanceRate >= 10 && college.acceptanceRate <= 25
          case "25-50":
            return college.acceptanceRate > 25 && college.acceptanceRate <= 50
          case "over-50":
            return college.acceptanceRate > 50
          default:
            return true
        }
      })
    }

    // Ranking filter
    if (filters.ranking !== "all") {
      result = result.filter((college) => {
        switch (filters.ranking) {
          case "top-25":
            return college.ranking <= 25
          case "top-50":
            return college.ranking <= 50
          case "top-100":
            return college.ranking <= 100
          default:
            return true
        }
      })
    }

    if (filters.location !== "all") {
      const locationMap: Record<string, string[]> = {
        north: ["DL", "HR", "PB", "UP", "UK", "JK", "HP", "CH"],
        south: ["TN", "KA", "KL", "AP", "TS", "PY"],
        west: ["MH", "RJ", "GJ", "GA"],
        east: ["WB", "OR", "BH", "JH", "AS", "SK", "ML", "MN", "TR", "NL"],
        central: ["MP", "CG"],
      }
      const states = locationMap[filters.location] ?? []
      result = result.filter((college) =>
        states.some((state) => college.location.includes(state))
      )
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "ranking":
          return a.ranking - b.ranking
        case "tuition-low":
          return a.tuition - b.tuition
        case "tuition-high":
          return b.tuition - a.tuition
        case "acceptance":
          return a.acceptanceRate - b.acceptanceRate
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    return result
  }, [searchQuery, filters, sortBy])

  const totalPages = Math.ceil(filteredColleges.length / ITEMS_PER_PAGE)
  const paginatedColleges = filteredColleges.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const selectedColleges = collegesData.filter((c) =>
    selectedCollegeIds.includes(c.id)
  )

  const handleToggleCompare = (id: string) => {
    setSelectedCollegeIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((cId) => cId !== id)
      }
      if (prev.length >= 4) {
        return prev
      }
      return [...prev, id]
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="mx-auto mb-8 max-w-5xl rounded-2xl border border-border bg-muted/40 px-6 py-10 text-center sm:px-10 sm:py-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            College discovery
          </p>
          <h1 className="mx-auto max-w-3xl text-5xl font-semibold tracking-tight leading-tight md:text-5xl lg:text-[4rem] lg:leading-[1.08]">
            Find the right college,{" "}
            <span className="text-primary">faster</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-lg leading-7 text-muted-foreground md:text-xl">
            Search institutions, refine by fees and rankings, and compare up to four
            colleges in one view.
          </p>
          <div className="mx-auto mt-6 flex max-w-md flex-wrap items-center justify-center gap-3">
            <span className="rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-muted-foreground">
              Smart filters
            </span>
            <span className="rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-muted-foreground">
              Side-by-side compare
            </span>
            <span className="rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-muted-foreground">
              Placement insights
            </span>
          </div>
        </section>

        <div className="mx-auto mb-6 max-w-2xl">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
          <div className="flex items-center gap-4">
            <MobileFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              activeCount={activeFiltersCount}
            />
            <p className="text-base text-muted-foreground">
              <span className="font-medium text-foreground">{filteredColleges.length}</span>{" "}
              colleges found
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-base text-muted-foreground">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-9 w-40 rounded-lg border-border">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ranking">Ranking</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="tuition-low">Tuition: Low to High</SelectItem>
                <SelectItem value="tuition-high">Tuition: High to Low</SelectItem>
                <SelectItem value="acceptance">Acceptance Rate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-8 lg:gap-10">
          {/* Filters Sidebar - Desktop */}
          <div className="hidden w-72 shrink-0 lg:block">
            <div className="sticky top-24">
              <FiltersSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>

          {/* College Grid */}
          <div className="flex-1">
            {paginatedColleges.length > 0 ? (
              <>
                <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
                  {paginatedColleges.map((college) => (
                    <CollegeCard
                      key={college.id}
                      college={college}
                      isSelected={selectedCollegeIds.includes(college.id)}
                      onToggleCompare={handleToggleCompare}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-10">
                    <PaginationControls
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 py-24 text-center">
                <div className="mb-5 rounded-lg bg-muted p-4">
                  <svg
                    className="h-8 w-8 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">No colleges found</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Compare Bar */}
      <CompareBar
        selectedColleges={selectedColleges}
        onRemove={(id) =>
          setSelectedCollegeIds((prev) => prev.filter((cId) => cId !== id))
        }
        onClear={() => setSelectedCollegeIds([])}
      />

      {/* Spacer for compare bar */}
      {selectedColleges.length > 0 && <div className="h-20" />}
    </div>
  )
}
