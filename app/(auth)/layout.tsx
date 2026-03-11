import type { ReactNode } from "react";
import Link from "next/link";
import { HiSquares2X2 } from "react-icons/hi2";

import { Card } from "@/components/ui/card";
import { ModeToggle } from "@/components/common/ModeToggle";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-muted border-r border-border items-center justify-center p-12">
        <div className="relative z-10 max-w-md space-y-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-foreground flex items-center justify-center">
              <HiSquares2X2 className="h-5 w-5 text-background" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">WorkBoard</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground leading-tight tracking-tight">
            Manage your team with clarity and confidence
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            AI-powered workforce management that helps teams stay aligned, productive, and focused on what matters.
          </p>
          <div className="flex items-center gap-6 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold tracking-tight text-foreground">10k+</div>
              <div className="text-xs text-muted-foreground">Teams</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <div className="text-2xl font-bold tracking-tight text-foreground">99.9%</div>
              <div className="text-xs text-muted-foreground">Uptime</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <div className="text-2xl font-bold tracking-tight text-foreground">4.9</div>
              <div className="text-xs text-muted-foreground">Rating</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex w-full lg:w-1/2 flex-col">
        <div className="flex items-center justify-between p-6">
          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <div className="h-8 w-8 rounded-lg bg-foreground flex items-center justify-center">
              <HiSquares2X2 className="h-4 w-4 text-background" />
            </div>
            <span className="font-semibold text-foreground">WorkBoard</span>
          </Link>
          <div className="ml-auto">
            <ModeToggle />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center px-6 pb-12">
          <Card className="w-full max-w-md border-border">
            {children}
          </Card>
        </div>
      </div>
    </div>
  );
}
