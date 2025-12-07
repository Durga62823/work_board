import { requireLead } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import { getTeamSprints, getSprintBurndown } from "@/lib/lead-helpers";
import { format } from "date-fns";
import Link from "next/link";

export default async function LeadSprintsPage() {
  const session = await requireLead();

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      team: {
        select: { id: true, name: true },
      },
    },
  });

  if (!user?.team) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">No Team Assigned</h2>
        <p className="text-gray-600">Please contact your administrator to assign you to a team.</p>
      </div>
    );
  }

  const sprints = await getTeamSprints(user.team.id, true);
  const activeSprint = sprints.find((s) => s.status === "ACTIVE");
  const planningSprint = sprints.find((s) => s.status === "PLANNING");
  const completedSprints = sprints.filter((s) => s.status === "COMPLETED").slice(0, 5);

  let burndownData = null;
  if (activeSprint) {
    burndownData = await getSprintBurndown(activeSprint.id);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sprint Planning</h1>
          <p className="text-gray-600 mt-1">Manage sprints and track team velocity</p>
        </div>
        <Link
          href="/lead/sprints/new"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Create Sprint
        </Link>
      </div>

      {/* Active Sprint */}
      {activeSprint && (
        <div className="bg-white rounded-lg shadow-md border-2 border-purple-200">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                    ACTIVE
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900">{activeSprint.name}</h2>
                </div>
                <p className="text-gray-600">{activeSprint.goal}</p>
              </div>
              <Link
                href={`/lead/sprints/${activeSprint.id}`}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                View Details →
              </Link>
            </div>

            <div className="grid grid-cols-4 gap-4 mt-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Duration</p>
                <p className="text-lg font-semibold text-gray-900">
                  {format(new Date(activeSprint.startDate), "MMM d")} -{" "}
                  {format(new Date(activeSprint.endDate), "MMM d")}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Story Points</p>
                <p className="text-lg font-semibold text-gray-900">
                  {activeSprint._count?.tasks || 0} tasks
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Capacity</p>
                <p className="text-lg font-semibold text-gray-900">
                  {activeSprint.capacityHours}h
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Velocity</p>
                <p className="text-lg font-semibold text-gray-900">
                  {activeSprint.velocity || "-"} pts
                </p>
              </div>
            </div>

            {/* Burndown Chart Placeholder */}
            {burndownData && burndownData.ideal && burndownData.actual && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Sprint Burndown</h3>
                <div className="h-48 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center text-gray-500">
                    <p className="text-sm">Ideal: {burndownData.ideal.join(", ")}</p>
                    <p className="text-sm mt-1">Actual: {burndownData.actual.join(", ")}</p>
                    <p className="text-xs mt-2 text-gray-400">Chart visualization to be implemented</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Planning Sprint */}
      {planningSprint && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                    PLANNING
                  </span>
                  <h2 className="text-xl font-bold text-gray-900">{planningSprint.name}</h2>
                </div>
                <p className="text-gray-600">{planningSprint.goal}</p>
              </div>
              <Link
                href={`/lead/sprints/${planningSprint.id}`}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Plan Sprint →
              </Link>
            </div>

            <div className="flex gap-4 mt-4">
              <div className="bg-gray-50 rounded-lg p-3 flex-1">
                <p className="text-sm text-gray-600 mb-1">Start Date</p>
                <p className="font-semibold text-gray-900">
                  {format(new Date(planningSprint.startDate), "MMM d, yyyy")}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 flex-1">
                <p className="text-sm text-gray-600 mb-1">End Date</p>
                <p className="font-semibold text-gray-900">
                  {format(new Date(planningSprint.endDate), "MMM d, yyyy")}
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 flex-1">
                <p className="text-sm text-gray-600 mb-1">Capacity</p>
                <p className="font-semibold text-gray-900">{planningSprint.capacityHours}h</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Completed Sprints */}
      {completedSprints.length > 0 && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Sprints</h2>
            <div className="space-y-3">
              {completedSprints.map((sprint) => (
                <div
                  key={sprint.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs font-semibold rounded">
                        COMPLETED
                      </span>
                      <h3 className="font-semibold text-gray-900">{sprint.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{sprint.goal}</p>
                  </div>
                  <div className="flex items-center gap-6 ml-4">
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Velocity</p>
                      <p className="text-lg font-bold text-gray-900">{sprint.velocity || "-"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Tasks</p>
                      <p className="text-lg font-bold text-gray-900">{sprint._count?.tasks || 0}</p>
                    </div>
                    <Link
                      href={`/lead/sprints/${sprint.id}`}
                      className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!activeSprint && !planningSprint && completedSprints.length === 0 && (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Sprints Yet</h2>
            <p className="text-gray-600 mb-6">
              Create your first sprint to start planning and tracking team work.
            </p>
            <Link
              href="/lead/sprints/new"
              className="inline-flex px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Create First Sprint
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
