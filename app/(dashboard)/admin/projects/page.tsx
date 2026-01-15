import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getAllProjects, getProjectStats } from "@/app/actions/admin-projects";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <div className="min-h-screen bg-background">
      <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        {/* Header with gradient badge */}
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-primary">
              Projects Overview
            </h2>
            <p className="text-muted-foreground mt-1">
              Monitor all projects across the organization
            </p>
          </div>
        </div>

        {/* Project Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Card className="border-2 border-transparent bg-card backdrop-blur-sm shadow-lg hover:border-primary hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {stats.total}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-transparent bg-primary/10 backdrop-blur-sm shadow-lg hover:border-primary hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">On Track</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {stats.onTrack}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-transparent bg-card backdrop-blur-sm shadow-lg hover:border-primary hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">At Risk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {stats.atRisk}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-transparent bg-card backdrop-blur-sm shadow-lg hover:border-primary hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Delayed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {stats.delayed}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-transparent bg-primary/10 backdrop-blur-sm shadow-lg hover:border-primary hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {stats.completed}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Table */}
        <Card className="border-2 border-transparent bg-card backdrop-blur-sm shadow-lg hover:border-primary hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">All Projects</CardTitle>
            <CardDescription className="text-base">
              {projects.length} project{projects.length !== 1 ? "s" : ""} in the
              system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border-2 border-transparent hover:border-primary transition-all duration-300 overflow-hidden bg-card backdrop-blur-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary/10 hover:bg-primary/20">
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
                      <TableCell
                        colSpan={7}
                        className="text-center py-8 text-primary"
                      >
                        No projects found
                      </TableCell>
                    </TableRow>
                  ) : (
                    projects.map((project) => (
                      <TableRow
                        key={project.id}
                        className="hover:bg-muted/50 transition-colors"
                      >
                        <TableCell className="font-medium">
                          {project.name}
                        </TableCell>
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
                        <TableCell className="text-muted-foreground">
                          {project.owner.firstName} {project.owner.lastName}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {project.team?.name || "-"}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="font-medium">
                            {project._count.members}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="font-medium text-primary"
                          >
                            {Math.round(project.completionRate)}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
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

