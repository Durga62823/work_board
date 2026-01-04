"use client";

import { ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SettingsProvider } from "@/components/providers/settings-provider";
import { ModeToggle, ColorPicker, UserMenu } from "@/components/common";
import { MobileMenu } from "@/components/common/MobileMenu";

const leadNavigation = [
  { name: "Overview", href: "/lead" },
  { name: "Team Board", href: "/lead/team-board" },
  { name: "Sprints", href: "/lead/sprints" },
  { name: "Technical Metrics", href: "/lead/metrics" },
  { name: "Code Reviews", href: "/lead/code-reviews" },
  { name: "✨ AI Features", href: "/lead/ai-features" },
];

export default function LeadLayout({ children }: { children: ReactNode }) {
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

  return (
    <SettingsProvider>
      <div className="min-h-screen bg-muted">
        <div className="border-b bg-card sticky top-0 z-40">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4 gap-4">
              <div className="flex items-center gap-4 md:gap-8 flex-1 min-w-0">
                <MobileMenu navigation={leadNavigation} />
                <h1 className="text-base sm:text-xl md:text-2xl font-bold text-foreground whitespace-nowrap truncate">
                  Tech Lead Dashboard
                </h1>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <ModeToggle />
                <ColorPicker />
                <UserMenu />
              </div>
            </div>
            <nav className="hidden md:flex gap-1 overflow-x-auto pb-2">
              {leadNavigation.map((item) => (
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
        </div>
        <main className="container mx-auto px-4 py-8">{children}</main>
      </div>
    </SettingsProvider>
  );
}
