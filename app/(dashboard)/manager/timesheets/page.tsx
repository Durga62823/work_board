import { requireManager } from "@/lib/guards";
import { getPendingTimesheets } from "@/lib/manager-helpers";
import { TimesheetApprovalCard } from "@/components/manager/TimesheetApprovalCard";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Timesheets | Manager Dashboard",
};

export default async function ManagerTimesheetsPage() {
  const session = await requireManager();
  const timesheets = await getPendingTimesheets(session.user.id);

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
              Manager - Timesheets
            </h1>
            <p className="mt-1 text-slate-600">
              Review and approve timesheets from your team
            </p>
          </div>
        </div>

        {/* Pending Timesheets */}
        <div className="rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg overflow-hidden">
          <div className="border-b border-slate-200/60 bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4">
            <h3 className="text-lg font-semibold text-slate-900">
              Pending Timesheets ({timesheets.length})
            </h3>
          </div>
          <div className="divide-y divide-slate-100">
            {timesheets.map((timesheet) => (
              <TimesheetApprovalCard key={timesheet.id} timesheet={timesheet} />
            ))}
            {timesheets.length === 0 && (
              <div className="px-6 py-12 text-center text-slate-500">
                No pending timesheets to review
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
