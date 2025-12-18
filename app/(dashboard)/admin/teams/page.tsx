import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getAllTeams, getAllDepartments } from "@/app/actions/admin-organization";
import { TeamsClient } from "@/components/admin/TeamsClient";

export default async function TeamsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const [teams, departments] = await Promise.all([
    getAllTeams(),
    getAllDepartments(),
  ]);

  if (!teams || !departments) {
    return <div>Unauthorized</div>;
  }

  return <TeamsClient initialTeams={teams} departments={departments} />;
}

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Teams</h2>
          <p className="text-muted-foreground">
            Manage organizational teams and their members
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Team
        </Button>
      </div>

      {teams.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No teams yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get started by creating your first team
            </p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Team
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((team: any) => (
            <Card key={team.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{team.name}</span>
                  <Users className="h-5 w-5 text-muted-foreground" />
                </CardTitle>
                <CardDescription>
                  {team.description || "No description"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Department:</span>
                    <span className="font-medium">{team.department.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Members:</span>
                    <Badge variant="secondary">{team._count.users}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Projects:</span>
                    <Badge variant="secondary">{team._count.projects}</Badge>
                  </div>
                  <Button variant="outline" className="w-full mt-2">
                    View Team
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
