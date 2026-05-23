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
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/50 bg-card/95 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 overflow-x-auto">
          <div className="flex shrink-0 items-center gap-2 text-sm font-medium">
            <GitCompare className="h-4 w-4 text-primary" />
            <span>Compare ({selectedColleges.length}/4)</span>
          </div>
          <div className="flex gap-2">
            {selectedColleges.map((college) => (
              <div
                key={college.id}
                className="flex shrink-0 items-center gap-2 rounded-full border border-border/50 bg-secondary px-3 py-1.5"
              >
                <span className="max-w-[120px] truncate text-sm">{college.name}</span>
                <button
                  onClick={() => onRemove(college.id)}
                  className="rounded-full p-0.5 text-muted-foreground hover:bg-background hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
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
