"use client"

import { Button } from "@/components/ui/button"
import { GraduationCap, Menu, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 transition-opacity hover:opacity-90">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <GraduationCap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-base font-semibold tracking-tight">UniScout</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-base font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground">
            Browse
          </Link>
          <Link href="/colleges/compare" className="text-base font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground">
            Compare
          </Link>
          <Link href="#" className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground">
            Rankings
          </Link>
          <Link href="#" className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground">
            Resources
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm">
            Sign in
          </Button>
          <Button size="sm">Get Started</Button>
        </div>

        <button
          className="flex h-9 w-9 items-center justify-center rounded-md border border-border md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border/50 bg-background md:hidden">
          <div className="space-y-1 px-4 py-4">
            <Link href="/" className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">
              Browse
            </Link>
            <Link href="/colleges/compare" className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">
              Compare
            </Link>
            <Link href="#" className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">
              Rankings
            </Link>
            <Link href="#" className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">
              Resources
            </Link>
            <div className="flex gap-3 pt-4">
              <Button variant="ghost" size="sm" className="flex-1">
                Sign in
              </Button>
              <Button size="sm" className="flex-1">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
