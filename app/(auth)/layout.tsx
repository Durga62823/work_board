import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 px-4 py-12">
      <Card className="w-full max-w-xl">{children}</Card>
    </div>
  );
}
