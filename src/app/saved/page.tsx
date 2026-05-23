import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"

export default function SavedCollegesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight">Saved colleges</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Sign in to save colleges and revisit them here. Saving will be available once auth is wired up.
        </p>
        <Button className="mt-8" asChild>
          <Link href="/">Discover colleges</Link>
        </Button>
      </main>
    </div>
  )
}
