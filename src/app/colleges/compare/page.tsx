// src/app/colleges/compare/page.tsx
import { collegesData } from "@/lib/colleges-data";
import { formatCurrency } from "@/lib/format";
import Link from "next/link";

interface ComparePageProps {
  searchParams: Promise<{ ids?: string }>;
}

export default async function CompareCollegesPage({ searchParams }: ComparePageProps) {
  // Await searchParams per Next.js App Router specification
  const { ids } = await searchParams;
  
  // Parse comma-separated string IDs into a searchable array
  const selectedIds = ids ? ids.split(",") : [];

  // Filter out the full matching college objects from the known static dataset
  const comparedColleges = (collegesData || []).filter((college) =>
    selectedIds.includes(college.id.toString())
  );

  // Fallback view if zero or invalid identifiers make it to the route params
  if (comparedColleges.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-400 mb-4 text-2xl">
          📊
        </div>
        <h1 className="text-2xl font-bold text-slate-900">No colleges selected for comparison</h1>
        <p className="text-slate-500 mt-2">Go back to the homepage and select at least two institutions to evaluate.</p>
        <Link 
          href="/" 
          className="mt-6 inline-block bg-slate-900 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition shadow-sm"
        >
          Back to Browse
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      {/* Header Info Area */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-6 mb-10">
        <div>
          <Link href="/" className="text-sm font-medium text-slate-500 hover:text-slate-800 transition flex items-center gap-1">
            ← Back to Search
          </Link>
          <h1 className="text-3xl font-bold text-slate-900 mt-2 tracking-tight">Compare Institutions</h1>
        </div>
        <div>
          <span className="inline-flex items-center text-sm font-semibold bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full">
            Comparing {comparedColleges.length} Colleges
          </span>
        </div>
      </div>

      {/* Comparison Grid Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {comparedColleges.map((college) => (
          <div 
            key={college.id} 
            className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition duration-200"
          >
            {/* Visual Media Wrapper */}
            <div className="relative h-44 bg-slate-100">
              {college.image ? (
                <img 
                  src={college.image} 
                  alt={college.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 text-sm">
                  No Image Available
                </div>
              )}
              <div className="absolute top-3 right-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-lg text-xs font-bold text-slate-800 shadow-sm flex items-center gap-1">
                ⭐ {college.rating}
              </div>
            </div>

            {/* Core Analytical Metric Fields */}
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight line-clamp-1" title={college.name}>
                  {college.name}
                </h2>
                <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                  📍 {college.location}
                </p>
              </div>

              <div className="space-y-4 border-t border-slate-100 pt-5">
                {/* Tuition Row */}
                <div>
                  <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase block">
                    Annual Fees
                  </span>
                  <p className="text-xl font-extrabold text-slate-900 mt-0.5">
                    {formatCurrency(college.tuition)}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase block">
                    Acceptance Rate
                  </span>
                  <p className="text-lg font-bold text-emerald-600 mt-0.5">
                    {college.acceptanceRate}%
                  </p>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase block">
                    Enrollment
                  </span>
                  <p className="text-lg font-bold text-slate-900 mt-0.5">
                    {college.enrollment.toLocaleString("en-US")}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-400 tracking-wider uppercase block">
                    Available Programs
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {college.programs.length > 0 ? (
                      college.programs.map((program) => (
                        <span
                          key={program}
                          className="text-[11px] font-semibold bg-slate-50 text-slate-600 border border-slate-200 px-2 py-0.5 rounded-md uppercase tracking-wide"
                        >
                          {program}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-400 italic">No programs listed</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}