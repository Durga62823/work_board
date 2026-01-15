import * as React from "react"
import Link from "next/link"
import { 
  LayoutDashboard, 
  CheckSquare, 
  Clock, 
  TrendingUp, 
  Target, 
  Calendar,
  Award
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { ModeToggle, ColorPicker, UserMenu } from "@/components/common"

const employeeNav = [
  { title: "Dashboard", url: "/employee", icon: LayoutDashboard },
  { title: "My Tasks", url: "/employee/my-work", icon: CheckSquare },
  { title: "Timesheet", url: "/employee/timesheet", icon: Clock },
  { title: "Performance", url: "/employee/performance", icon: TrendingUp },
  { title: "Goals", url: "/employee/goals", icon: Target },
  { title: "Calendar", url: "/employee/calendar", icon: Calendar },
  { title: "Appraisal", url: "/employee/appraisal", icon: Award },
]

export function EmployeeSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/employee">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <LayoutDashboard className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">WorkBoard</span>
                  <span className="truncate text-xs">Employee Portal</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {employeeNav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Theme">
              <div className="flex items-center">
                <ModeToggle />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Colors">
              <div className="flex items-center">
                <ColorPicker />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <UserMenu />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
