import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { CreateUserForm } from "@/components/admin/CreateUserForm";

export default async function CreateUserPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Add New User</h2>
        <p className="text-muted-foreground">
          Create a new user account for your organization
        </p>
      </div>

      <CreateUserForm />
    </div>
  );
}
