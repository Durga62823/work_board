"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  UserMenu,
  LogoutButton,
  ModeToggle,
  ColorPicker,
} from "@/components/common";
import { MobileMenu } from "@/components/common/MobileMenu";
import { useSession } from "next-auth/react";

const adminNavigation = [
  { name: "Dashboard", href: "/admin" },
  { name: "Users", href: "/admin/users" },
  { name: "Departments", href: "/admin/departments" },
  { name: "Projects", href: "/admin/projects" },
  { name: "Analytics", href: "/admin/analytics" },
  { name: "AI Features", href: "/admin/ai-features" },
  { name: "Audit Logs", href: "/admin/audit" },
];

export default function AdminLayout({
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
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  const userName = session.user?.name || session.user?.email || "Admin";

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      {/* Top Navigation Bar */}
      <header className="border-b border-border bg-card shadow-sm sticky top-0 z-40">
        <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-4 md:gap-8 flex-1 min-w-0">
              <MobileMenu navigation={adminNavigation} />
              <h1 className="text-base sm:text-lg font-bold text-foreground whitespace-nowrap truncate">
                {userName}
              </h1>
              <nav className="hidden md:flex gap-1 flex-1 overflow-x-auto">
                {adminNavigation.map((item) => (
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

      {/* Main content area */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
