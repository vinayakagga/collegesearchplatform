import { collegesData } from "@/lib/colleges-data"
import { formatCurrency } from "@/lib/format"

interface ComparePageProps {
  searchParams: {
    ids?: string
  }
}

export default function ComparePage({
  searchParams,
}: ComparePageProps) {
  const ids =
    searchParams.ids?.split(",") || []

  const colleges = collegesData.filter((college) =>
    ids.includes(college.id)
  )

  if (colleges.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg text-muted-foreground">
          No colleges selected for comparison
        </p>
      </div>
    )
  }

  return (
    <main className="mx-auto max-w-7xl p-8">
      <h1 className="mb-8 text-4xl font-bold">
        Compare Colleges
      </h1>

      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-secondary">
              <th className="p-4 text-left">
                Feature
              </th>

              {colleges.map((college) => (
                <th
                  key={college.id}
                  className="p-4 text-left"
                >
                  {college.name}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>

            <tr className="border-b">
              <td className="p-4 font-medium">
                Location
              </td>

              {colleges.map((college) => (
                <td
                  key={college.id}
                  className="p-4"
                >
                  {college.location}
                </td>
              ))}
            </tr>

            <tr className="border-b">
              <td className="p-4 font-medium">
                Tuition Fees
              </td>

              {colleges.map((college) => (
                <td
                  key={college.id}
                  className="p-4"
                >
                  {formatCurrency(college.tuition)}
                </td>
              ))}
            </tr>

            <tr className="border-b">
              <td className="p-4 font-medium">
                Ranking
              </td>

              {colleges.map((college) => (
                <td
                  key={college.id}
                  className="p-4"
                >
                  #{college.ranking}
                </td>
              ))}
            </tr>

            <tr className="border-b">
              <td className="p-4 font-medium">
                Acceptance Rate
              </td>

              {colleges.map((college) => (
                <td
                  key={college.id}
                  className="p-4"
                >
                  {college.acceptanceRate}%
                </td>
              ))}
            </tr>

            <tr className="border-b">
              <td className="p-4 font-medium">
                Enrollment
              </td>

              {colleges.map((college) => (
                <td
                  key={college.id}
                  className="p-4"
                >
                  {college.enrollment.toLocaleString()}
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-4 font-medium">
                Programs
              </td>

              {colleges.map((college) => (
                <td
                  key={college.id}
                  className="p-4"
                >
                  <div className="flex flex-wrap gap-2">
                    {college.programs.map((program) => (
                      <span
                        key={program}
                        className="rounded bg-secondary px-2 py-1 text-sm"
                      >
                        {program}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

          </tbody>
        </table>
      </div>
    </main>
  )
}