"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

interface College {
  id: string
  name: string
}

interface CompareBarProps {
  selectedColleges: College[]
  onRemove: (id: string) => void
  onClear: () => void
}

export function CompareBar({
  selectedColleges,
  onRemove,
  onClear,
}: CompareBarProps) {
  if (selectedColleges.length === 0) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 p-4">

        <div className="flex flex-wrap gap-2">
          {selectedColleges.map((college) => (
            <div
              key={college.id}
              className="flex items-center gap-2 rounded-lg border px-3 py-2"
            >
              <span className="text-sm font-medium">
                {college.name}
              </span>

              <button
                onClick={() => onRemove(college.id)}
                className="text-red-500"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={onClear}
          >
            Clear
          </Button>

          <Button asChild>
                                                       
                                                       <Link
                                                       
    href={`/colleges/compare?ids=${selectedColleges
      .map((c) => c.id)
      .join(",")}`}
  >
    Compare Now
  </Link>
</Button>
        </div>
      </div>
    </div>
  )
}