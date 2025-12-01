import { redirect } from "next/navigation";
import Link from "next/link";
import { Users, Building2, FolderKanban, TrendingUp, Shield, Settings, LayoutDashboard } from "lucide-react";

import { auth } from "@/lib/auth";

const adminNavigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Departments", href: "/admin/departments", icon: Building2 },
  { name: "Projects", href: "/admin/projects", icon: FolderKanban },
  { name: "Analytics", href: "/admin/analytics", icon: TrendingUp },
  { name: "Audit Logs", href: "/admin/audit", icon: Shield },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  // TODO: Check if user has admin role once migrations are run
  // if (session.user.role !== "ADMIN") {
  //   redirect("/dashboard");
  // }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden w-64 overflow-y-auto border-r bg-gray-50/40 lg:block">
        <div className="flex h-full flex-col px-3 py-4">
          <div className="mb-6 px-3">
            <h2 className="text-lg font-semibold">Admin Panel</h2>
            <p className="text-sm text-muted-foreground">Organization management</p>
          </div>
          <nav className="flex-1 space-y-1">
            {adminNavigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
