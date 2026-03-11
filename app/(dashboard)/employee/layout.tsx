"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { LogoutButton } from "@/components/common/LogoutButton";
import { UserMenu } from "@/components/common/UserMenu";
import { ModeToggle } from "@/components/common";
import { MobileMenu } from "@/components/common/MobileMenu";
import { EmployeeSidebar } from "@/components/employee/employee-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

const employeeNavigation = [
  { name: "Dashboard", href: "/employee" },
  { name: "My Tasks", href: "/employee/my-work" },
  { name: "Timesheet", href: "/employee/timesheet" },
  {
    name: "Performance",
    href: "/employee/performance",
  },
  { name: "Goals", href: "/employee/goals" },
  { name: "Calendar", href: "/employee/calendar" },
  { name: "Appraisal", href: "/employee/appraisal" },
];

export default function EmployeeDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  // Allow EMPLOYEE and other roles to access dashboard
  const userRole = (session.user as any).role || "EMPLOYEE";

  return (
    <SidebarProvider>
      <EmployeeSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background/95 sticky top-0 z-40">
          <div className="flex items-center gap-2 px-4 flex-1">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mx-2 h-4" />
            <nav className="flex items-center gap-1.5 text-sm">
              <span className="font-medium text-muted-foreground">Employee</span>
            </nav>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
