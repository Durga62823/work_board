import { requireManager } from "@/lib/guards";
import { getDirectReports } from "@/lib/manager-helpers";
import { prisma } from "@/lib/prisma";
import { PTOApprovalCard } from "@/components/manager/PTOApprovalCard";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "PTO Requests | Manager Dashboard",
};

export default async function ManagerPTOPage() {
  const session = await requireManager();
  const team = await getDirectReports(session.user.id);
  const teamIds = team.map((m) => m.id);

  const requests = await prisma.pTORequest.findMany({
    where: {
      userId: {
        in: teamIds,
      },
    },
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          image: true,
        },
      },
      approver: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const pending = requests.filter((r) => r.status === "PENDING");
  const approved = requests.filter((r) => r.status === "APPROVED");
  const rejected = requests.filter((r) => r.status === "REJECTED");

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
              Manager - PTO
            </h1>
            <p className="mt-1 text-slate-600">
              Review and manage time-off requests from your team
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg p-6 transition-all hover:shadow-xl hover:scale-105">
            <div className="text-sm font-medium text-slate-500">Pending</div>
            <div className="mt-2 text-3xl font-bold text-slate-900">
              {pending.length}
            </div>
          </div>
          <div className="rounded-2xl border border-green-200/60 bg-gradient-to-br from-green-50 to-emerald-50 backdrop-blur-sm shadow-lg p-6 transition-all hover:shadow-xl hover:scale-105">
            <div className="text-sm font-medium text-green-700">Approved</div>
            <div className="mt-2 text-3xl font-bold text-green-600">
              {approved.length}
            </div>
          </div>
          <div className="rounded-2xl border border-red-200/60 bg-gradient-to-br from-red-50 to-rose-50 backdrop-blur-sm shadow-lg p-6 transition-all hover:shadow-xl hover:scale-105">
            <div className="text-sm font-medium text-red-700">Rejected</div>
            <div className="mt-2 text-3xl font-bold text-red-600">
              {rejected.length}
            </div>
          </div>
        </div>

        {/* Pending Requests */}
        {pending.length > 0 && (
          <div className="rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg overflow-hidden">
            <div className="border-b border-slate-200/60 bg-gradient-to-r from-amber-50 to-yellow-50 px-6 py-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Pending Requests ({pending.length})
              </h3>
            </div>
            <div className="divide-y divide-slate-100">
              {pending.map((request) => (
                <PTOApprovalCard key={request.id} request={request} />
              ))}
            </div>
          </div>
        )}

        {/* Approved Requests */}
        {approved.length > 0 && (
          <div className="rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg overflow-hidden">
            <div className="border-b border-slate-200/60 bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Approved Requests ({approved.length})
              </h3>
            </div>
            <div className="divide-y divide-slate-100">
              {approved.slice(0, 10).map((request) => (
                <div key={request.id} className="px-6 py-4 transition-all hover:bg-green-50/50">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium text-slate-900">
                        {request.user.firstName} {request.user.lastName}
                      </div>
                      <div className="mt-1 text-sm text-slate-500">
                        {request.type.replace("_", " ")} • {request.days} days
                      </div>
                      <div className="mt-1 text-sm text-slate-500">
                        {new Date(request.startDate).toLocaleDateString()} -{" "}
                        {new Date(request.endDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-sm">
                      <span className="inline-flex rounded-full bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-1 text-xs font-semibold text-green-700 shadow-sm">
                        Approved
                      </span>
                      {request.approver && (
                        <div className="mt-2 text-slate-500">
                          by {request.approver.firstName} {request.approver.lastName}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rejected Requests */}
        {rejected.length > 0 && (
          <div className="rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg overflow-hidden">
            <div className="border-b border-slate-200/60 bg-gradient-to-r from-red-50 to-rose-50 px-6 py-4">
              <h3 className="text-lg font-semibold text-slate-900">
                Rejected Requests ({rejected.length})
              </h3>
            </div>
            <div className="divide-y divide-slate-100">
              {rejected.slice(0, 10).map((request) => (
                <div key={request.id} className="px-6 py-4 transition-all hover:bg-red-50/30">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium text-slate-900">
                        {request.user.firstName} {request.user.lastName}
                      </div>
                      <div className="mt-1 text-sm text-slate-500">
                        {request.type.replace("_", " ")} • {request.days} days
                      </div>
                      <div className="mt-1 text-sm text-slate-500">
                        {new Date(request.startDate).toLocaleDateString()} -{" "}
                        {new Date(request.endDate).toLocaleDateString()}
                      </div>
                      {request.rejectionReason && (
                        <div className="mt-2 text-sm text-slate-600">
                          Reason: {request.rejectionReason}
                        </div>
                      )}
                    </div>
                    <span className="inline-flex rounded-full bg-gradient-to-r from-red-100 to-rose-100 px-3 py-1 text-xs font-semibold text-red-700 shadow-sm">
                      Rejected
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {requests.length === 0 && (
          <div className="rounded-2xl border border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg px-6 py-12 text-center text-slate-500">
            No PTO requests from your team
          </div>
        )}
      </div>
    </div>
  );
}
