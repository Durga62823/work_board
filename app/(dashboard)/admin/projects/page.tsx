import { redirect } from "next/navigation";
import { FolderKanban, TrendingUp, TrendingDown, AlertTriangle, Shield } from "lucide-react";

import { auth } from "@/lib/auth";
import { getAllProjects, getProjectStats } from "@/app/actions/admin-projects";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function ProjectsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const [projects, stats] = await Promise.all([
    getAllProjects(),
    getProjectStats(),
  ]);

  if (!projects || !stats) {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-orange-50">
      <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        {/* Header with gradient badge */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 shadow-lg">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Admin - Projects Overview
            </h2>
            <p className="text-slate-600 mt-1">
              Monitor all projects across the organization
            </p>
          </div>
        </div>

        {/* Project Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card className="border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <FolderKanban className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                {stats.total}
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200/60 bg-gradient-to-br from-white to-green-50/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">On Track</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.onTrack}</div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200/60 bg-gradient-to-br from-white to-yellow-50/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">At Risk</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.atRisk}</div>
            </CardContent>
          </Card>

          <Card className="border-red-200/60 bg-gradient-to-br from-white to-red-50/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delayed</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.delayed}</div>
            </CardContent>
          </Card>

          <Card className="border-blue-200/60 bg-gradient-to-br from-white to-blue-50/30 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <FolderKanban className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.completed}</div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Table */}
        <Card className="border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-2xl">All Projects</CardTitle>
            <CardDescription className="text-base">
              {projects.length} project{projects.length !== 1 ? "s" : ""} in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-slate-200/60 overflow-hidden bg-white/50 backdrop-blur-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100">
                    <TableHead className="font-semibold">Name</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Owner</TableHead>
                    <TableHead className="font-semibold">Team</TableHead>
                    <TableHead className="font-semibold">Members</TableHead>
                    <TableHead className="font-semibold">Completion</TableHead>
                    <TableHead className="font-semibold">Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-slate-500">
                        No projects found
                      </TableCell>
                    </TableRow>
                  ) : (
                    projects.map((project) => (
                      <TableRow key={project.id} className="hover:bg-red-50/50 transition-colors">
                        <TableCell className="font-medium">{project.name}</TableCell>
                        <TableCell>
                        <Badge
                          variant={
                            project.status === "ON_TRACK"
                              ? "default"
                              : project.status === "AT_RISK"
                              ? "secondary"
                              : project.status === "DELAYED"
                              ? "destructive"
                              : "outline"
                          }
                        >
                          {project.status.replace("_", " ")}
                        </Badge>
                      </TableCell>
                        <TableCell className="text-slate-600">
                          {project.owner.firstName} {project.owner.lastName}
                        </TableCell>
                        <TableCell className="text-slate-600">{project.team?.name || "-"}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-medium">
                            {project._count.members}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-medium text-green-700">
                            {Math.round(project.completionRate)}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-600">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
