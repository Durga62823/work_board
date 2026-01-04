"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserMenu, LogoutButton, ModeToggle, ColorPicker } from "@/components/common";
import { MobileMenu } from "@/components/common/MobileMenu";

const managerNavigation = [
  { name: "Overview", href: "/manager" },
  { name: "Team", href: "/manager/team" },
  { name: "Timesheets", href: "/manager/timesheets" },
  { name: "PTO Requests", href: "/manager/pto" },
  { name: "Appraisals", href: "/manager/appraisals" },
  { name: "Capacity", href: "/manager/capacity" },
  { name: "✨ AI Features", href: "/manager/ai-features" },
];

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      {/* Top Navigation Bar */}
      <header className="border-b border-border bg-card shadow-sm sticky top-0 z-40">
        <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-4 md:gap-8 flex-1 min-w-0">
              <MobileMenu navigation={managerNavigation} />
              <h1 className="text-base sm:text-lg font-bold text-foreground whitespace-nowrap truncate">
                Manager
              </h1>
              <nav className="hidden md:flex gap-1 flex-1 overflow-x-auto">
                {managerNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary border-2 border-transparent hover:border-primary transition-all duration-200 whitespace-nowrap"
                  >
                    {item.name}
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
