import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  getDirectReports,
  getTeamCapacity,
  getPendingPTORequests,
  getPendingTimesheets,
} from "@/lib/manager-helpers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {
  Users,
  Clock,
  FileText,
  Activity,
  Sparkles,
  ArrowUpRight,
  CalendarClock,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

export const metadata = {
  title: "Manager Dashboard | Make It Possible",
};

export default async function ManagerPage() {
  const session = await auth();
  
  if (!session?.user) {
    redirect("/auth/login");
  }
  
  const [directReports, pendingPTO, pendingTimesheets, teamCapacity] = await Promise.all([
    getDirectReports(session.user.id),
    getPendingPTORequests(session.user.id),
    getPendingTimesheets(session.user.id),
    getTeamCapacity(session.user.id),
  ]);

  const avgUtilization = teamCapacity.length > 0
    ? teamCapacity.reduce((sum, m) => sum + m.utilization, 0) / teamCapacity.length
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 p-8 md:p-12 shadow-2xl shadow-green-500/20">
          <div className="absolute inset-0 bg-grid-white/5" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl" />
          
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              <span className="text-sm font-medium text-white">Manager Dashboard</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Welcome, {session.user.name || "Manager"}
            </h1>
            <p className="text-lg text-green-100">
              Here's what's happening with your team
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="relative overflow-hidden border-slate-200/60 bg-white/70 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-slate-600">Team Members</CardTitle>
              <div className="p-2 rounded-lg bg-green-100">
                <Users className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{directReports.length}</div>
              <Link
                href="/manager/team"
                className="mt-2 inline-flex items-center gap-1 text-xs text-green-600 hover:text-green-700 font-medium"
              >
                View team
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-slate-200/60 bg-white/70 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-slate-600">Pending PTO</CardTitle>
              <div className="p-2 rounded-lg bg-blue-100">
                <CalendarClock className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{pendingPTO.length}</div>
              <Link
                href="/manager/pto"
                className="mt-2 inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
              >
                Review requests
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-slate-200/60 bg-white/70 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-slate-600">Pending Timesheets</CardTitle>
              <div className="p-2 rounded-lg bg-purple-100">
                <FileText className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{pendingTimesheets.length}</div>
              <Link
                href="/manager/timesheets"
                className="mt-2 inline-flex items-center gap-1 text-xs text-purple-600 hover:text-purple-700 font-medium"
              >
                Review timesheets
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-slate-200/60 bg-white/70 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-slate-600">Team Utilization</CardTitle>
              <div className="p-2 rounded-lg bg-emerald-100">
                <Activity className="h-4 w-4 text-emerald-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">
                {(avgUtilization * 100).toFixed(0)}%
              </div>
              <Link
                href="/manager/capacity"
                className="mt-2 inline-flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 font-medium"
              >
                View capacity
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Pending Actions */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Recent PTO Requests */}
          <Card className="border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-slate-900">Recent PTO Requests</CardTitle>
                  <CardDescription className="mt-1">Pending time-off approvals</CardDescription>
                </div>
                <Link
                  href="/manager/pto"
                  className="inline-flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700"
                >
                  View all
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingPTO.slice(0, 5).map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between rounded-xl border border-slate-200/60 bg-gradient-to-br from-slate-50 to-white p-4 hover:shadow-md transition-shadow"
                  >
                    <div>
                      <div className="font-semibold text-slate-900">
                        {request.user.firstName} {request.user.lastName}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                        <span>{request.type.replace("_", " ")}</span>
                        <span>•</span>
                        <span>{request.days} days</span>
                      </div>
                    </div>
                    <div className="text-sm text-slate-600 font-medium">
                      {new Date(request.startDate).toLocaleDateString()}
                    </div>
                  </div>
                ))}
                {pendingPTO.length === 0 && (
                  <div className="py-12 text-center">
                    <div className="inline-flex p-4 rounded-full bg-green-100 mb-3">
                      <CalendarClock className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-sm text-slate-500">No pending PTO requests</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Timesheets */}
          <Card className="border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-slate-900">Pending Timesheets</CardTitle>
                  <CardDescription className="mt-1">Awaiting your review</CardDescription>
                </div>
                <Link
                  href="/manager/timesheets"
                  className="inline-flex items-center gap-1 text-sm font-medium text-green-600 hover:text-green-700"
                >
                  View all
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingTimesheets.slice(0, 5).map((timesheet) => (
                  <div
                    key={timesheet.id}
                    className="flex items-center justify-between rounded-xl border border-slate-200/60 bg-gradient-to-br from-slate-50 to-white p-4 hover:shadow-md transition-shadow"
                  >
                    <div>
                      <div className="font-semibold text-slate-900">
                        {timesheet.user.firstName} {timesheet.user.lastName}
                      </div>
                      <div className="text-sm text-slate-500 mt-1">
                        Week of {new Date(timesheet.weekStart).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-lg font-bold text-slate-900">
                      {timesheet.totalHours}h
                    </div>
                  </div>
                ))}
                {pendingTimesheets.length === 0 && (
                  <div className="py-12 text-center">
                    <div className="inline-flex p-4 rounded-full bg-purple-100 mb-3">
                      <FileText className="h-6 w-6 text-purple-600" />
                    </div>
                    <p className="text-sm text-slate-500">No pending timesheets</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Capacity Overview */}
        <Card className="border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-slate-900">Team Capacity</CardTitle>
            <CardDescription>Current workload and utilization metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamCapacity.map((member) => (
                <div 
                  key={member.user.id} 
                  className="flex items-center gap-4 p-4 rounded-xl border border-slate-200/60 bg-gradient-to-br from-slate-50 to-white hover:shadow-md transition-shadow"
                >
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900">
                      {member.user.firstName} {member.user.lastName}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                      <span>{member.activeProjects} active projects</span>
                      <span>•</span>
                      <span>{member.avgWeeklyHours.toFixed(1)}h/week avg</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-32 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full transition-all ${
                          member.utilization > 1
                            ? "bg-gradient-to-r from-red-500 to-red-600"
                            : member.utilization > 0.8
                            ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                            : "bg-gradient-to-r from-green-500 to-emerald-500"
                        }`}
                        style={{ width: `${Math.min(member.utilization * 100, 100)}%` }}
                      />
                    </div>
                    <div className="flex items-center gap-1 min-w-[60px]">
                      <span className="text-sm font-bold text-slate-900">
                        {(member.utilization * 100).toFixed(0)}%
                      </span>
                      {member.utilization > 1 && (
                        <AlertCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {teamCapacity.length === 0 && (
                <div className="py-12 text-center">
                  <div className="inline-flex p-4 rounded-full bg-emerald-100 mb-3">
                    <Users className="h-6 w-6 text-emerald-600" />
                  </div>
                  <p className="text-sm text-slate-500">No team members assigned</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
