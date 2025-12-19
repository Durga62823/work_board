import { requireManager } from "@/lib/guards";
import { getTeamAppraisals } from "@/lib/manager-helpers";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Appraisals | Manager Dashboard",
};

export default async function ManagerAppraisalsPage() {
  const session = await requireManager();
  
  const [cycles, teamAppraisals] = await Promise.all([
    prisma.appraisalCycle.findMany({
      orderBy: { startDate: "desc" },
      take: 5,
    }),
    getTeamAppraisals(session.user.id),
  ]);

  const activeCycle = cycles.find(c => c.status === "IN_PROGRESS");
  const draft = teamAppraisals.filter(a => a.status === "DRAFT");
  const inProgress = teamAppraisals.filter(a => a.status === "IN_PROGRESS");
  const completed = teamAppraisals.filter(a => a.status === "COMPLETED");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Manager - Appraisals
            </h1>
            <p className="mt-1 text-slate-600">
              Conduct performance reviews and manage team appraisals
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg p-6 transition-all hover:shadow-xl hover:scale-105">
            <div className="text-sm font-medium text-slate-500">Draft</div>
            <div className="mt-2 text-3xl font-bold text-slate-900">
              {draft.length}
            </div>
          </div>
          <div className="rounded-2xl border border-blue-200/60 bg-gradient-to-br from-blue-50 to-cyan-50 backdrop-blur-sm shadow-lg p-6 transition-all hover:shadow-xl hover:scale-105">
            <div className="text-sm font-medium text-blue-700">In Progress</div>
            <div className="mt-2 text-3xl font-bold text-blue-600">
              {inProgress.length}
            </div>
          </div>
          <div className="rounded-2xl border border-green-200/60 bg-gradient-to-br from-green-50 to-emerald-50 backdrop-blur-sm shadow-lg p-6 transition-all hover:shadow-xl hover:scale-105">
            <div className="text-sm font-medium text-green-700">Completed</div>
            <div className="mt-2 text-3xl font-bold text-green-600">
              {completed.length}
            </div>
          </div>
        </div>

        {/* Active Cycle */}
        {activeCycle && (
          <div className="rounded-2xl border border-blue-200/60 bg-gradient-to-br from-blue-50 to-cyan-50 backdrop-blur-sm shadow-lg p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-blue-900">
                  {activeCycle.name}
                </h3>
                <p className="mt-1 text-sm text-blue-700">
                  {activeCycle.description}
                </p>
                <div className="mt-2 text-sm text-blue-600">
                  {new Date(activeCycle.startDate).toLocaleDateString()} -{" "}
                  {new Date(activeCycle.endDate).toLocaleDateString()}
                </div>
              </div>
              <span className="rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 px-3 py-1 text-sm font-semibold text-blue-700 shadow-sm">
                Active Cycle
              </span>
            </div>
          </div>
        )}

        {/* In Progress Reviews */}
        {inProgress.length > 0 && (
          <div className="rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg overflow-hidden">
            <div className="border-b border-slate-200/60 bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4">
              <h3 className="text-lg font-semibold text-slate-900">
                In Progress ({inProgress.length})
              </h3>
            </div>
            <div className="divide-y divide-slate-100">
              {inProgress.map((review) => (
                <div key={review.id} className="px-6 py-4 transition-all hover:bg-blue-50/50">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium text-slate-900">
                        {review.user.firstName} {review.user.lastName}
                      </div>
                      <div className="mt-1 text-sm text-slate-500">
                        {review.user.position} • {review.cycle.name}
                      </div>
                      {review.selfReview && (
                        <div className="mt-2 flex items-center gap-2 text-sm">
                          <span className="rounded-full bg-gradient-to-r from-green-100 to-emerald-100 px-2 py-1 text-xs font-semibold text-green-700 shadow-sm">
                            Self-review submitted
                          </span>
                        </div>
                      )}
                    </div>
                    <Link
                      href={`/manager/appraisals/${review.id}`}
                      className="rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2 text-sm font-medium text-white hover:from-green-700 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all"
                    >
                      Conduct Review
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Draft Reviews */}
        {draft.length > 0 && (
          <div className="rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg overflow-hidden">
            <div className="border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-gray-50 px-6 py-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Draft ({draft.length})
              </h3>
            </div>
            <div className="divide-y divide-slate-100">
              {draft.map((review) => (
                <div key={review.id} className="px-6 py-4 transition-all hover:bg-slate-50/50">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium text-slate-900">
                        {review.user.firstName} {review.user.lastName}
                      </div>
                      <div className="mt-1 text-sm text-slate-500">
                        {review.user.position} • {review.cycle.name}
                      </div>
                    </div>
                    <Link
                      href={`/manager/appraisals/${review.id}`}
                      className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:border-green-300 transition-all"
                    >
                      Start Review
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Reviews */}
        {completed.length > 0 && (
          <div className="rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg overflow-hidden">
            <div className="border-b border-slate-200/60 bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Completed ({completed.length})
              </h3>
            </div>
            <div className="divide-y divide-slate-100">
              {completed.slice(0, 10).map((review) => (
                <div key={review.id} className="px-6 py-4 transition-all hover:bg-green-50/50">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium text-slate-900">
                        {review.user.firstName} {review.user.lastName}
                      </div>
                      <div className="mt-1 text-sm text-slate-500">
                        {review.user.position} • {review.cycle.name}
                      </div>
                      {review.finalRating && (
                        <div className="mt-2 text-sm">
                          <span className="text-slate-500">Final Rating:</span>{" "}
                          <span className="font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            {review.finalRating.toFixed(1)}/5.0
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/manager/appraisals/${review.id}`}
                        className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:border-green-300 transition-all"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {teamAppraisals.length === 0 && (
          <div className="rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg px-6 py-12 text-center text-slate-500">
            No appraisals available
          </div>
        )}
      </div>
    </div>
  );
}
