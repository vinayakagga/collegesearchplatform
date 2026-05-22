"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search colleges by name, location, or major..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-xl border-border/50 bg-secondary/50 pl-12 pr-24 text-sm placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20"
      />
      <Button
        size="sm"
        className="absolute right-2 top-1/2 -translate-y-1/2"
      >
        Search
      </Button>
    </div>
  )
}
