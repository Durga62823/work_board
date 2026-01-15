import * as React from "react"
import Link from "next/link"
import { 
  LayoutDashboard, 
  Users, 
  Zap, 
  BarChart2, 
  GitPullRequest, 
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

const leadNav = [
  { title: "Overview", url: "/lead", icon: LayoutDashboard },
  { title: "Team Board", url: "/lead/team-board", icon: Users },
  { title: "Sprints", url: "/lead/sprints", icon: Zap },
  { title: "Technical Metrics", url: "/lead/metrics", icon: BarChart2 },
  { title: "Code Reviews", url: "/lead/code-reviews", icon: GitPullRequest },
  { title: "AI Features", url: "/lead/ai-features", icon: Sparkles },
]

export function LeadSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/lead">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Users className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">WorkBoard</span>
                  <span className="truncate text-xs">Tech Lead</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {leadNav.map((item) => (
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
