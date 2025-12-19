import { requireManager } from "@/lib/guards";
import { getTeamCapacity, getTeamCalendar } from "@/lib/manager-helpers";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Team Capacity | Manager Dashboard",
};

export default async function ManagerCapacityPage() {
  const session = await requireManager();
  
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 30);
  
  const [capacity, calendar] = await Promise.all([
    getTeamCapacity(session.user.id),
    getTeamCalendar(session.user.id, startDate, endDate),
  ]);

  const avgUtilization = capacity.length > 0
    ? capacity.reduce((sum, m) => sum + m.utilization, 0) / capacity.length
    : 0;

  const overUtilized = capacity.filter(m => m.utilization > 1).length;
  const underUtilized = capacity.filter(m => m.utilization < 0.7).length;

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
              Manager - Capacity
            </h1>
            <p className="mt-1 text-slate-600">
              Monitor workload and resource allocation across your team
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
          <div className="rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg p-6 transition-all hover:shadow-xl hover:scale-105">
            <div className="text-sm font-medium text-slate-500">Avg Utilization</div>
            <div className="mt-2 text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {(avgUtilization * 100).toFixed(0)}%
            </div>
          </div>
          <div className="rounded-2xl border border-green-200/60 bg-gradient-to-br from-green-50 to-emerald-50 backdrop-blur-sm shadow-lg p-6 transition-all hover:shadow-xl hover:scale-105">
            <div className="text-sm font-medium text-green-700">Team Size</div>
            <div className="mt-2 text-3xl font-bold text-green-600">
              {capacity.length}
            </div>
          </div>
          <div className="rounded-2xl border border-red-200/60 bg-gradient-to-br from-red-50 to-rose-50 backdrop-blur-sm shadow-lg p-6 transition-all hover:shadow-xl hover:scale-105">
            <div className="text-sm font-medium text-red-700">Over-utilized</div>
            <div className="mt-2 text-3xl font-bold text-red-600">
              {overUtilized}
            </div>
          </div>
          <div className="rounded-2xl border border-yellow-200/60 bg-gradient-to-br from-yellow-50 to-amber-50 backdrop-blur-sm shadow-lg p-6 transition-all hover:shadow-xl hover:scale-105">
            <div className="text-sm font-medium text-yellow-700">Under-utilized</div>
            <div className="mt-2 text-3xl font-bold text-yellow-600">
              {underUtilized}
            </div>
          </div>
        </div>

        {/* Team Capacity Details */}
        <div className="rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg overflow-hidden">
          <div className="border-b border-slate-200/60 bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4">
            <h3 className="text-lg font-semibold text-slate-900">Team Workload</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {capacity.map((member) => (
              <div key={member.user.id} className="px-6 py-4 transition-all hover:bg-green-50/50">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-emerald-100 text-sm font-semibold text-green-700">
                    {member.user.firstName?.[0]}{member.user.lastName?.[0]}
                  </div>
                <div className="flex-1">
                  <div className="font-medium text-slate-900">
                    {member.user.firstName} {member.user.lastName}
                  </div>
                  <div className="mt-1 text-sm text-slate-500">
                    {member.activeProjects} projects • {member.avgWeeklyHours.toFixed(1)}h/week
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-3 w-48 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full transition-all ${
                        member.utilization > 1
                          ? "bg-red-500"
                          : member.utilization > 0.8
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${Math.min(member.utilization * 100, 100)}%` }}
                    />
                  </div>
                  <div className="w-16 text-right">
                    <span
                      className={`text-sm font-semibold ${
                        member.utilization > 1
                          ? "text-red-600"
                          : member.utilization > 0.8
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {(member.utilization * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
              {member.utilization > 1 && (
                <div className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                  ⚠️ Over-utilized: Consider redistributing workload or extending deadlines
                </div>
              )}
              {member.utilization < 0.5 && (
                <div className="mt-3 rounded-lg bg-yellow-50 px-3 py-2 text-sm text-yellow-700">
                  💡 Under-utilized: Available capacity for new projects
                </div>
              )}
            </div>
          ))}
            {capacity.length === 0 && (
              <div className="px-6 py-12 text-center text-slate-500">
                No team capacity data available
              </div>
            )}
          </div>
        </div>
        {/* Upcoming PTO */}
        <div className="rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg overflow-hidden">
          <div className="border-b border-slate-200/60 bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4">
            <h3 className="text-lg font-semibold text-slate-900">
              Upcoming Time Off (Next 30 Days)
            </h3>
          </div>
          <div className="divide-y divide-slate-100">
            {calendar.ptoRequests.map((pto) => (
              <div key={pto.id} className="px-6 py-4 transition-all hover:bg-blue-50/50">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-slate-900">
                    {pto.user.firstName} {pto.user.lastName}
                  </div>
                  <div className="mt-1 text-sm text-slate-500">
                    {new Date(pto.startDate).toLocaleDateString()} -{" "}
                    {new Date(pto.endDate).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-slate-900">
                    {pto.days} days
                  </div>
                  <div className="text-sm text-slate-500">
                    {pto.type.replace("_", " ")}
                  </div>
                </div>
              </div>
            </div>
            ))}
            {calendar.ptoRequests.length === 0 && (
              <div className="px-6 py-12 text-center text-slate-500">
                No upcoming time off scheduled
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
