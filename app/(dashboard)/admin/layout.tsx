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
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

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
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-card sticky top-0 z-40">
          <div className="flex items-center gap-2 px-4 flex-1">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-base sm:text-lg font-bold text-foreground">
              Workboard
            </h1>
          </div>
        </header>
        <main className="flex-1 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
