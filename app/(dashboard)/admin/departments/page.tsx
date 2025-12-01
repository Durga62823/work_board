import { redirect } from "next/navigation";
import { Plus, Building2 } from "lucide-react";
import Link from "next/link";

import { auth } from "@/lib/auth";
import { getAllDepartments } from "@/app/actions/admin-organization";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function DepartmentsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const departments = await getAllDepartments();

  if (!departments) {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Departments</h2>
          <p className="text-muted-foreground">
            Manage organizational departments and their structure
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Department
        </Button>
      </div>

      {departments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No departments yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get started by creating your first department
            </p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Department
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {departments.map((dept) => (
            <Card key={dept.id}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{dept.name}</span>
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                </CardTitle>
                <CardDescription>
                  {dept.description || "No description"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Teams:</span>
                    <Badge variant="secondary">{dept._count.teams}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Members:</span>
                    <Badge variant="secondary">{dept._count.users}</Badge>
                  </div>
                  <Link href={`/admin/departments/${dept.id}`}>
                    <Button variant="outline" className="w-full mt-2">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
