import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { UserMenu, LogoutButton, ModeToggle, ColorPicker } from "@/components/common";

export default async function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      {/* Top Navigation Bar */}
      <header className="border-b border-border bg-card shadow-sm sticky top-0 z-40">
        <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8 flex-1">
              <h1 className="text-lg font-bold text-foreground whitespace-nowrap">
                Manager
              </h1>
              <nav className="hidden md:flex gap-1">
                <Link
                  href="/manager"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  Overview
                </Link>
                <Link
                  href="/manager/team"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  Team
                </Link>
                <Link
                  href="/manager/timesheets"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  Timesheets
                </Link>
                <Link
                  href="/manager/pto"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  PTO Requests
                </Link>
                <Link
                  href="/manager/appraisals"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  Appraisals
                </Link>
                <Link
                  href="/manager/capacity"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  Capacity
                </Link>
                <Link
                  href="/manager/ai-features"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  ✨ AI Features
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
