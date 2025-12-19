import { requireManager } from "@/lib/guards";
import { getDirectReports, getExtendedTeam } from "@/lib/manager-helpers";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Team | Manager Dashboard",
};

export default async function ManagerTeamPage() {
  const session = await requireManager();
  const { directReports, extendedReports } = await getExtendedTeam(session.user.id);

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
              Manager - Team
            </h1>
            <p className="mt-1 text-slate-600">
              Your direct reports and extended team members
            </p>
          </div>
        </div>

        {/* Direct Reports */}
        <div className="rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg overflow-hidden">
          <div className="border-b border-slate-200/60 bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4">
            <h3 className="text-lg font-semibold text-slate-900">
              Direct Reports ({directReports.length})
            </h3>
          </div>
          <div className="divide-y divide-slate-100">
            {directReports.map((member) => (
              <div key={member.id} className="px-6 py-4 transition-all hover:bg-green-50/50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-emerald-100 text-sm font-semibold text-green-700">
                        {member.firstName?.[0]}{member.lastName?.[0]}
                      </div>
                      <div>
                        <Link
                          href={`/manager/team/${member.id}`}
                          className="font-medium text-slate-900 hover:text-green-600 transition-colors"
                        >
                          {member.firstName} {member.lastName}
                        </Link>
                        <div className="text-sm text-slate-500">{member.email}</div>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-4 text-sm">
                      <div>
                        <span className="text-slate-500">Position:</span>{" "}
                        <span className="font-medium text-slate-900">
                          {member.position || "Not set"}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">Department:</span>{" "}
                        <span className="font-medium text-slate-900">
                          {member.department?.name || "Not assigned"}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">Team:</span>{" "}
                        <span className="font-medium text-slate-900">
                          {member.team?.name || "Not assigned"}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">Active Projects:</span>{" "}
                        <span className="font-medium text-slate-900">
                          {member.projectMembers.length}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/manager/team/${member.id}`}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:border-green-300 transition-all"
                    >
                      View Details
                    </Link>
                    <Link
                      href={`/manager/one-on-ones?userId=${member.id}`}
                      className="rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-1.5 text-sm font-medium text-white hover:from-green-700 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all"
                    >
                      Schedule 1:1
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {directReports.length === 0 && (
              <div className="px-6 py-12 text-center text-slate-500">
                No direct reports assigned
              </div>
            )}
          </div>
        </div>

        {/* Extended Team */}
        {extendedReports.length > 0 && (
          <div className="rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg overflow-hidden">
            <div className="border-b border-slate-200/60 bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Extended Team ({extendedReports.length})
              </h3>
              <p className="text-sm text-slate-600">
                Reports of your direct reports
              </p>
            </div>
            <div className="divide-y divide-slate-100">
              {extendedReports.map((member) => (
                <div key={member.id} className="px-6 py-4 transition-all hover:bg-green-50/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-100 to-green-100 text-sm font-semibold text-emerald-700">
                        {member.firstName?.[0]}{member.lastName?.[0]}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900">
                          {member.firstName} {member.lastName}
                        </div>
                        <div className="text-sm text-slate-500">
                          Reports to {member.manager?.firstName} {member.manager?.lastName}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <div>
                        <span className="text-slate-500">Position:</span>{" "}
                        <span className="font-medium text-slate-900">
                          {member.position || "Not set"}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">Team:</span>{" "}
                        <span className="font-medium text-slate-900">
                          {member.team?.name || "Not assigned"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
