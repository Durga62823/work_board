import { redirect } from "next/navigation";
import { HiUsers, HiBuildingOffice2, HiRocketLaunch, HiTrophy, HiShieldCheck, HiCog6Tooth, HiSparkles, HiArrowUpRight, HiChartBar, HiUserPlus, HiRectangleGroup } from "react-icons/hi2";

import { auth } from "@/lib/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const session = await auth();                                 

  if (!session?.user) {
    redirect("/auth/login");
  }

  // TODO: Check if user has admin role once migrations are run
  // if (session.user.role !== "ADMIN") {
  //   redirect("/dashboard");
  // }

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl bg-primary p-8 md:p-12 shadow-2xl">
          <div className="absolute inset-0 bg-grid-white/5" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl" />
          
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 mb-4">
              <HiSparkles className="h-4 w-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">Admin Dashboard</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 leading-tight">
              System Administration
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Manage organization, users, and platform settings
            </p>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="relative overflow-hidden border-border bg-card backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-primary">Total Users</CardTitle>
              <div className="p-2 rounded-lg bg-primary/10">
                <HiUsers className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">0</div>
              <p className="text-xs text-muted-foreground mt-1">Active across organization</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-border bg-card backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-primary">Departments</CardTitle>
              <div className="p-2 rounded-lg bg-primary/10">
                <HiBuildingOffice2 className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">0</div>
              <p className="text-xs text-muted-foreground mt-1">With teams and members</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-border bg-card backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-primary">Active Projects</CardTitle>
              <div className="p-2 rounded-lg bg-primary/10">
                <HiRocketLaunch className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">0</div>
              <p className="text-xs text-muted-foreground mt-1">On track and in progress</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-border bg-card backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-primary">Completion Rate</CardTitle>
              <div className="p-2 rounded-lg bg-primary/10">
                <HiTrophy className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">0%</div>
              <p className="text-xs text-muted-foreground mt-1">Organization average</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* User Management */}
            <Link href="/admin/users">
              <Card className="group relative overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <CardContent className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-primary shadow-lg shadow-primary/30">
                      <HiUsers className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <HiArrowUpRight className="h-5 w-5 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">User Management</h3>
                  <p className="text-sm text-muted-foreground mb-4">Manage users, roles, and permissions</p>
                  <div className="flex gap-2">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                      <HiUserPlus className="h-3 w-3" />
                      Create User
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Organization */}
            <Link href="/admin/departments">
              <Card className="group relative overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <CardContent className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-primary shadow-lg shadow-primary/30">
                      <HiBuildingOffice2 className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <HiArrowUpRight className="h-5 w-5 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Organization</h3>
                  <p className="text-sm text-muted-foreground mb-4">Manage departments, teams, and structure</p>
                  <div className="flex gap-2">
                    <span className="text-xs font-medium text-primary">Departments</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs font-medium text-primary">Teams</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Projects */}
            <Link href="/admin/projects">
              <Card className="group relative overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <CardContent className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-primary shadow-lg shadow-primary/30">
                      <HiRectangleGroup className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <HiArrowUpRight className="h-5 w-5 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Projects</h3>
                  <p className="text-sm text-muted-foreground">Overview of all projects and status</p>
                </CardContent>
              </Card>
            </Link>

            {/* Performance */}
            <Link href="/admin/analytics">
              <Card className="group relative overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <CardContent className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-primary shadow-lg shadow-primary/30">
                      <HiChartBar className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <HiArrowUpRight className="h-5 w-5 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Performance</h3>
                  <p className="text-sm text-muted-foreground mb-4">Analytics, KPIs, and appraisals</p>
                  <div className="flex gap-2">
                    <span className="text-xs font-medium text-primary">Analytics</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs font-medium text-primary">Appraisals</span>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Security & Audit */}
            <Link href="/admin/audit">
              <Card className="group relative overflow-hidden border-2 border-destructive/30 bg-gradient-to-br from-destructive/5 to-destructive/10 hover:border-destructive/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-destructive/20 to-destructive/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <CardContent className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-destructive shadow-lg shadow-destructive/30">
                      <HiShieldCheck className="h-6 w-6 text-destructive-foreground" />
                    </div>
                    <HiArrowUpRight className="h-5 w-5 text-destructive group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Security & Audit</h3>
                  <p className="text-sm text-muted-foreground">Audit logs and security settings</p>
                </CardContent>
              </Card>
            </Link>

            {/* Integrations & Settings */}
            <Link href="/admin/settings">
              <Card className="group relative overflow-hidden border-2 border-border bg-gradient-to-br from-muted/50 to-muted hover:border-border/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-muted to-muted/50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <CardContent className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-muted-foreground shadow-lg shadow-muted-foreground/30">
                      <HiCog6Tooth className="h-6 w-6 text-muted" />
                    </div>
                    <HiArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Integrations & Settings</h3>
                  <p className="text-sm text-muted-foreground mb-4">Configure integrations and AI features</p>
                  <div className="flex gap-2">
                    <span className="text-xs font-medium text-muted-foreground">Integrations</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs font-medium text-muted-foreground">Settings</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
