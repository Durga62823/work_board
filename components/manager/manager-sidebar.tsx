import * as React from "react"
import Link from "next/link"
import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  Calendar, 
  Award, 
  PieChart, 
  Sparkles
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

const managerNav = [
  { title: "Overview", url: "/manager", icon: LayoutDashboard },
  { title: "Team", url: "/manager/team", icon: Users },
  { title: "Timesheets", url: "/manager/timesheets", icon: Clock },
  { title: "PTO Requests", url: "/manager/pto", icon: Calendar },
  { title: "Appraisals", url: "/manager/appraisals", icon: Award },
  { title: "Capacity", url: "/manager/capacity", icon: PieChart },
  { title: "AI Features", url: "/manager/ai-features", icon: Sparkles },
]

export function ManagerSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/manager">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Users className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">WorkBoard</span>
                  <span className="truncate text-xs">Manager Portal</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {managerNav.map((item) => (
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
