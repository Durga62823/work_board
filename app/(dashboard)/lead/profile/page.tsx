import { requireLead } from "@/lib/guards";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";

export default async function LeadProfilePage() {
  const session = await requireLead();

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      team: {
        select: {
          id: true,
          name: true,
          description: true,
          department: {
            select: {
              name: true,
            },
          },
        },
      },
      manager: {
        select: {
          name: true,
          email: true,
          position: true,
        },
      },
    },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  // Get team stats
  const teamStats = await prisma.user.findMany({
    where: {
      teamId: user.teamId,
      status: "ACTIVE",
    },
    select: {
      id: true,
      name: true,
      position: true,
      image: true,
    },
  });

  // Get recent activity (tasks completed this month)
  const tasksCompleted = await prisma.task.count({
    where: {
      assigneeId: user.id,
      status: "DONE",
      completedAt: {
        gte: new Date(new Date().setDate(1)), // First day of current month
      },
    },
  });

  const tasksInProgress = await prisma.task.count({
    where: {
      assigneeId: user.id,
      status: "IN_PROGRESS",
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <p className="text-gray-600 mt-1">Your professional information and team details</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center text-3xl font-bold text-purple-600">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-purple-600 font-medium mt-1">{user.position}</p>
              <p className="text-gray-600 mt-2">{user.email}</p>
              
              <div className="flex items-center gap-4 mt-4">
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-semibold text-gray-900">
                    {format(new Date(user.createdAt), "MMM d, yyyy")}
                  </p>
                </div>
                <div className="h-8 w-px bg-gray-300" />
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {user.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-600 mb-2">Tasks Completed</p>
          <p className="text-3xl font-bold text-gray-900">{tasksCompleted}</p>
          <p className="text-xs text-gray-500 mt-1">This month</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-600 mb-2">Active Tasks</p>
          <p className="text-3xl font-bold text-gray-900">{tasksInProgress}</p>
          <p className="text-xs text-gray-500 mt-1">In progress</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <p className="text-sm font-medium text-gray-600 mb-2">Team Members</p>
          <p className="text-3xl font-bold text-gray-900">{teamStats.length}</p>
          <p className="text-xs text-gray-500 mt-1">Active members</p>
        </div>
      </div>

      {/* Team Information */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Team Information</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Team</p>
              <p className="text-lg font-semibold text-gray-900">{user.team?.name}</p>
              {user.team?.description && (
                <p className="text-sm text-gray-600 mt-1">{user.team.description}</p>
              )}
            </div>
            
            {user.team?.department && (
              <div>
                <p className="text-sm font-medium text-gray-600">Department</p>
                <p className="text-lg font-semibold text-gray-900">{user.team.department.name}</p>
              </div>
            )}
            
            {user.manager && (
              <div>
                <p className="text-sm font-medium text-gray-600">Reports To</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">
                    {user.manager.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{user.manager.name}</p>
                    <p className="text-sm text-gray-600">{user.manager.position}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Team Members ({teamStats.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {teamStats.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-sm font-bold text-purple-600">
                  {member.name?.charAt(0).toUpperCase() || "?"}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-600">{member.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-600">Email</p>
              <p className="text-gray-900">{user.email}</p>
            </div>
            
            {user.phoneNumber && (
              <div>
                <p className="text-sm font-medium text-gray-600">Phone</p>
                <p className="text-gray-900">{user.phoneNumber}</p>
              </div>
            )}
            
            {user.lastLogin && (
              <div>
                <p className="text-sm font-medium text-gray-600">Last Login</p>
                <p className="text-gray-900">
                  {format(new Date(user.lastLogin), "PPpp")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
