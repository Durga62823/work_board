import { ReactNode } from "react";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
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

export default async function LeadLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
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
            <nav className="hidden md:flex space-x-8 overflow-x-auto">
              {leadNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="border-b-2 border-transparent px-1 pb-4 text-sm font-medium text-muted-foreground hover:border-border hover:text-foreground whitespace-nowrap"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </div>
    </SettingsProvider>
  );
}
