import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { LogoutButton } from "@/components/common/LogoutButton";
import { UserMenu } from "@/components/common/UserMenu";
import { ModeToggle, ColorPicker } from "@/components/common";
import {
  HiHome,
  HiCheckCircle,
  HiClock,
  HiArrowTrendingUp,
  HiFlag,
  HiCalendar,
  HiDocumentText,
  HiCog6Tooth,
} from "react-icons/hi2";

export default async function EmployeeDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  // Allow EMPLOYEE and other roles to access dashboard
  const userRole = (session.user as any).role || "EMPLOYEE";

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      {/* Top Navigation Bar */}
      <header className="border-b border-border bg-card shadow-sm sticky top-0 z-40">
        <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8 flex-1">
              <h1 className="text-lg font-bold text-foreground whitespace-nowrap">
                Employee Dashboard
              </h1>
              <nav className="hidden md:flex gap-1">
                <Link
                  href="/employee"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <HiHome className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/employee/my-work"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <HiCheckCircle className="h-4 w-4" />
                  My Tasks
                </Link>
                <Link
                  href="/employee/timesheet"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <HiClock className="h-4 w-4" />
                  Timesheet
                </Link>
                <Link
                  href="/employee/performance"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <HiArrowTrendingUp className="h-4 w-4" />
                  Performance
                </Link>
                <Link
                  href="/employee/goals"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <HiFlag className="h-4 w-4" />
                  Goals
                </Link>
                <Link
                  href="/employee/calendar"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <HiCalendar className="h-4 w-4" />
                  Calendar
                </Link>
                <Link
                  href="/employee/appraisal"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <HiDocumentText className="h-4 w-4" />
                  Appraisals
                </Link>
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

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-full px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
