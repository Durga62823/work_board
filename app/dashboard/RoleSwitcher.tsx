"use client";

import { RoleSwitcher } from "@/components/common/RoleSwitcher";

export function DashboardRoleSwitcher({ currentRole }: { currentRole: string }) {
  return <RoleSwitcher currentRole={currentRole} />;
}
