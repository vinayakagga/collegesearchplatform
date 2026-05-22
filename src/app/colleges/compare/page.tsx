import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-2xl font-bold">Compare colleges</h1>
        <p className="mt-3 text-muted-foreground">
          Select up to four colleges on the home page, then use Compare to review them side by side.
        </p>
        <Button className="mt-8" asChild>
          <Link href="/">Browse colleges</Link>
        </Button>
      </main>
    </div>
  )
}
