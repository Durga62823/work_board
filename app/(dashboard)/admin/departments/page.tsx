import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { getAllDepartments } from "@/app/actions/admin-organization";
import { DepartmentsClient } from "@/components/admin/DepartmentsClient";

export default async function DepartmentsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const departments = await getAllDepartments();

  if (!departments) {
    return <div>Unauthorized</div>;
  }

  return <DepartmentsClient initialDepartments={departments} />;
}
