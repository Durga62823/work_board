import { redirect } from "next/navigation";
import Link from "next/link";
import { HiUserGroup, HiBuildingOffice2, HiBriefcase, HiPresentationChartBar, HiClipboardDocumentList, HiCog6Tooth, HiChartPie, HiCpuChip } from "react-icons/hi2";

import { auth } from "@/lib/auth";
import { UserMenu, LogoutButton, ModeToggle, ColorPicker } from "@/components/common";

const adminNavigation = [
  { name: "Dashboard", href: "/admin", icon: HiChartPie },
  { name: "Users", href: "/admin/users", icon: HiUserGroup },
  { name: "Departments", href: "/admin/departments", icon: HiBuildingOffice2 },
  { name: "Projects", href: "/admin/projects", icon: HiBriefcase },
  { name: "Analytics", href: "/admin/analytics", icon: HiPresentationChartBar },
  { name: "AI Features", href: "/admin/ai-features", icon: HiCpuChip },
  { name: "Audit Logs", href: "/admin/audit", icon: HiClipboardDocumentList },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const userName = session.user?.name || session.user?.email || "Admin";

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      {/* Top Navigation Bar */}
      <header className="border-b border-border bg-card shadow-sm sticky top-0 z-40">
        <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8 flex-1">
              <h1 className="text-lg font-bold text-foreground whitespace-nowrap">
                {userName}
              </h1>
              <nav className="hidden md:flex gap-1">
                {adminNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-foreground transition-colors flex items-center gap-2"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-3">
              <ModeToggle />
              <ColorPicker />
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
