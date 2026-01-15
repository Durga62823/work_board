"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserMenu, LogoutButton, ModeToggle, ColorPicker } from "@/components/common";
import { MobileMenu } from "@/components/common/MobileMenu";
import { ManagerSidebar } from "@/components/manager/manager-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

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
    <SidebarProvider>
      <ManagerSidebar />
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
