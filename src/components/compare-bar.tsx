"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X, GitCompare } from "lucide-react"
import type { College } from "./college-card"

interface CompareBarProps {
  selectedColleges: College[]
  onRemove: (id: string) => void
  onClear: () => void
}

export function CompareBar({ selectedColleges, onRemove, onClear }: CompareBarProps) {
  if (selectedColleges.length === 0) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 overflow-x-auto">
          <div className="flex shrink-0 items-center gap-2 text-base font-medium">
            <GitCompare className="h-5 w-5 text-primary" />
            <span>Compare ({selectedColleges.length}/4)</span>
          </div>
          <div className="flex gap-2">
            {selectedColleges.map((college) => (
              <div
                key={college.id}
                className="flex shrink-0 items-center gap-2 rounded-md border border-border bg-muted px-3 py-1.5 text-base transition-colors hover:bg-muted/80"
              >
                <span className="max-w-[140px] truncate text-base">{college.name}</span>
                <button
                  onClick={() => onRemove(college.id)}
                  className="rounded-full p-0.5 text-muted-foreground hover:bg-background hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={onClear}>
            Clear
          </Button>

          {selectedColleges.length < 2 ? (
            <Button disabled={true}>
              Compare Now
            </Button>
          ) : (
            <Link
              href={`/colleges/compare?ids=${selectedColleges.map((c) => c.id).join(",")}`}
              className="inline-block"
            >
              <Button className="cursor-pointer">
                Compare Now
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
