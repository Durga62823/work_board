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
