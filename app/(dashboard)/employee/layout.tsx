"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { LogoutButton } from "@/components/common/LogoutButton";
import { UserMenu } from "@/components/common/UserMenu";
import { ModeToggle, ColorPicker } from "@/components/common";
import { MobileMenu } from "@/components/common/MobileMenu";

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
    <div className="min-h-screen bg-muted flex flex-col">
      {/* Top Navigation Bar */}
      <header className="border-b border-border bg-card shadow-sm sticky top-0 z-40">
        <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-4 md:gap-8 flex-1 min-w-0">
              <MobileMenu navigation={employeeNavigation} />
              <h1 className="text-base sm:text-lg font-bold text-foreground whitespace-nowrap truncate">
                Dashboard
              </h1>
              <nav className="hidden md:flex gap-1 flex-1 overflow-x-auto">
                {employeeNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary border-2 border-transparent hover:border-primary transition-all duration-200 whitespace-nowrap"
                  >
                    <span className="hidden lg:inline">{item.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <ModeToggle />
              <ColorPicker />
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-full px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
