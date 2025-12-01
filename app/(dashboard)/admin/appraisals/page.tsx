import { redirect } from "next/navigation";
import { Award, Calendar, Plus } from "lucide-react";

import { auth } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default async function AppraisalsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Appraisal Management</h2>
          <p className="text-muted-foreground">
            Create and manage performance appraisal cycles
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Appraisal Cycle
        </Button>
      </div>

      {/* Appraisal Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cycles</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">currently running</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">awaiting completion</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0%</div>
            <p className="text-xs text-muted-foreground">reviews completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Appraisal Cycles */}
      <Card>
        <CardHeader>
          <CardTitle>Appraisal Cycles</CardTitle>
          <CardDescription>
            All performance review cycles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Award className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No appraisal cycles yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create your first appraisal cycle to start tracking performance
            </p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Appraisal Cycle
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Appraisals */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Appraisals</CardTitle>
          <CardDescription>
            Latest completed performance reviews
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            No completed appraisals yet
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
