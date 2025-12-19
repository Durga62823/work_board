import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  TrendingUp, 
  CheckCircle2,
  Clock,
  AlertCircle,
  Sparkles,
  Settings,
  ChevronRight,
  Activity,
  ArrowUpRight,
  Zap,
  Shield,
  BarChart3,
  Globe,
  Github
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserMenu, LogoutButton } from "@/components/common";

export const metadata = {
  title: "Dashboard | Make It Possible",
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const userRole = session.user.role || "EMPLOYEE";
  const userName = session.user.name || "User";
  const userEmail = session.user.email || "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <LayoutDashboard className="h-5 w-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Make It Possible
                </span>
                <p className="text-xs text-slate-500">AI-Powered Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <UserMenu name={userName} email={userEmail} image={session.user.image} />
              <LogoutButton variant="ghost" size="sm" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 md:p-12 shadow-2xl shadow-blue-500/20">
          <div className="absolute inset-0 bg-grid-white/5" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
          
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              <span className="text-sm font-medium text-white">AI-Enhanced Workspace</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Welcome back, {userName}!
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mb-6">
              Your command center for productivity. Track progress, manage teams, and ship faster with AI-powered insights.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/employee"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-600 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                Get Started
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/settings"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold hover:bg-white/20 transition-all"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="relative overflow-hidden border-slate-200/60 bg-white/70 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-slate-600">Active Tasks</CardTitle>
              <div className="p-2 rounded-lg bg-blue-100">
                <CheckCircle2 className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">12</div>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <TrendingUp className="h-3 w-3 text-green-600" />
                3 completed this week
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-slate-200/60 bg-white/70 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-slate-600">Projects</CardTitle>
              <div className="p-2 rounded-lg bg-green-100">
                <FolderKanban className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">5</div>
              <p className="text-xs text-slate-500 mt-1">2 due this month</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-slate-200/60 bg-white/70 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-slate-600">Hours Logged</CardTitle>
              <div className="p-2 rounded-lg bg-purple-100">
                <Clock className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">38.5h</div>
              <p className="text-xs text-slate-500 mt-1">This week</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-slate-200/60 bg-white/70 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-orange-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-slate-600">Team Activity</CardTitle>
              <div className="p-2 rounded-lg bg-orange-100">
                <Activity className="h-4 w-4 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">24</div>
              <p className="text-xs text-slate-500 mt-1">Updates today</p>
            </CardContent>
          </Card>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Quick Access</h2>
              <p className="text-sm text-slate-500 mt-1">Jump to your role-specific dashboard</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              href="/employee"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 border-2 border-blue-200/50 hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-400/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-blue-600 shadow-lg shadow-blue-500/30">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Employee Dashboard</h3>
                <p className="text-sm text-slate-600">Tasks, timesheets & goals</p>
              </div>
            </Link>

            {(userRole === "LEAD" || userRole === "MANAGER" || userRole === "ADMIN") && (
              <Link
                href="/lead"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 border-2 border-purple-200/50 hover:border-purple-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-purple-600 shadow-lg shadow-purple-500/30">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Tech Lead</h3>
                  <p className="text-sm text-slate-600">Team board & sprints</p>
                </div>
              </Link>
            )}

            {(userRole === "MANAGER" || userRole === "ADMIN") && (
              <Link
                href="/manager"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-6 border-2 border-green-200/50 hover:border-green-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-400/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-green-600 shadow-lg shadow-green-500/30">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-green-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Manager</h3>
                  <p className="text-sm text-slate-600">Team & approvals</p>
                </div>
              </Link>
            )}

            {userRole === "ADMIN" && (
              <Link
                href="/admin"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 p-6 border-2 border-red-200/50 hover:border-red-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-400/20 to-orange-400/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-red-600 shadow-lg shadow-red-500/30">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-red-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Admin Panel</h3>
                  <p className="text-sm text-slate-600">Users & settings</p>
                </div>
              </Link>
            )}

            <Link
              href="/settings"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-gray-50 p-6 border-2 border-slate-200/50 hover:border-slate-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-400/20 to-gray-400/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-700 shadow-lg shadow-slate-500/30">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Settings</h3>
                <p className="text-sm text-slate-600">Preferences & profile</p>
              </div>
            </Link>
          </div>
        </div>

        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 shadow-2xl">
          <div className="absolute inset-0 bg-grid-white/5" />
          <CardContent className="relative pt-8 pb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-white">2,500+</div>
                <p className="text-sm text-indigo-100">Companies Trust Us</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-white">50K+</div>
                <p className="text-sm text-indigo-100">Active Users</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-white">1M+</div>
                <p className="text-sm text-indigo-100">Tasks Completed</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-white">99.9%</div>
                <p className="text-sm text-indigo-100">Uptime</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900">How to Use</CardTitle>
              </div>
              <CardDescription className="text-slate-600">Get started in 3 simple steps</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Navigate to Your Dashboard</h4>
                    <p className="text-sm text-slate-600">
                      Choose your role-specific dashboard from Quick Access cards above
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/30">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Manage Your Work</h4>
                    <p className="text-sm text-slate-600">
                      Create tasks, track time, manage sprints, and collaborate with your team
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-bold shadow-lg shadow-green-500/30">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Leverage AI Features</h4>
                    <p className="text-sm text-slate-600">
                      Use AI-powered insights for better planning, code reviews, and productivity
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900">Key Benefits</CardTitle>
              </div>
              <CardDescription className="text-slate-600">Why teams love our platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <Zap className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-0.5">AI-Powered Automation</h4>
                    <p className="text-xs text-slate-600">Automate repetitive tasks and get intelligent suggestions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <Users className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-0.5">Real-Time Collaboration</h4>
                    <p className="text-xs text-slate-600">Work together seamlessly with your team in real-time</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-0.5">Enterprise Security</h4>
                    <p className="text-xs text-slate-600">Bank-level encryption and SOC 2 Type II certified</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <BarChart3 className="h-5 w-5 text-purple-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-0.5">Advanced Analytics</h4>
                    <p className="text-xs text-slate-600">Track performance with detailed insights and reports</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <Globe className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm mb-0.5">Seamless Integrations</h4>
                    <p className="text-xs text-slate-600">Connect with 100+ tools your team already uses</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-slate-900 mb-2">Connect Your Tools</CardTitle>
                <CardDescription className="text-slate-600">Integrate with your favorite platforms</CardDescription>
              </div>
              <Link
                href="/admin/integrations"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {[
                { name: "GitHub", bg: "bg-gray-900" },
                { name: "Jira", bg: "bg-blue-600" },
                { name: "Slack", bg: "bg-purple-600" },
                { name: "GitLab", bg: "bg-orange-600" },
                { name: "Teams", bg: "bg-blue-500" },
                { name: "+100", bg: "bg-gradient-to-br from-green-500 to-emerald-600" },
              ].map((tool, idx) => (
                <button
                  key={idx}
                  className="group flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-slate-200/60 hover:border-blue-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className={`w-14 h-14 ${tool.bg} rounded-xl flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                    {tool.name === "GitHub" ? (
                      <Github className="h-7 w-7 text-white" />
                    ) : (
                      <span className="text-xl font-bold text-white">{tool.name.charAt(0)}</span>
                    )}
                  </div>
                  <span className="text-xs font-semibold text-slate-700">{tool.name}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
                  <Activity className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900">Recent Activity</CardTitle>
              </div>
              <CardDescription className="text-slate-600">Your latest updates and changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                  <div className="flex-shrink-0 p-2 rounded-lg bg-green-50">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900">Task completed</p>
                    <p className="text-xs text-slate-600 mt-0.5">User authentication implementation</p>
                    <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                  <div className="flex-shrink-0 p-2 rounded-lg bg-blue-50">
                    <Clock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900">Timesheet submitted</p>
                    <p className="text-xs text-slate-600 mt-0.5">Week ending December 19, 2025</p>
                    <p className="text-xs text-slate-400 mt-1">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors group">
                  <div className="flex-shrink-0 p-2 rounded-lg bg-purple-50">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900">AI suggestion applied</p>
                    <p className="text-xs text-slate-600 mt-0.5">Code review optimizations</p>
                    <p className="text-xs text-slate-400 mt-1">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-red-600">
                  <AlertCircle className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-slate-900">Notifications</CardTitle>
              </div>
              <CardDescription className="text-slate-600">Important updates and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50 border border-blue-600/20 hover:shadow-md transition-all group">
                  <div className="flex-shrink-0 text-blue-600">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900">Sprint planning meeting</p>
                    <p className="text-xs text-slate-600 mt-0.5">Tomorrow at 10:00 AM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-green-50 border border-green-600/20 hover:shadow-md transition-all group">
                  <div className="flex-shrink-0 text-green-600">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900">PTO request approved</p>
                    <p className="text-xs text-slate-600 mt-0.5">December 23-27, 2025</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-purple-50 border border-purple-600/20 hover:shadow-md transition-all group">
                  <div className="flex-shrink-0 text-purple-600">
                    <Users className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900">New team member</p>
                    <p className="text-xs text-slate-600 mt-0.5">John Doe joined your team</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-white/70 backdrop-blur-sm border-t border-slate-200/60 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  <LayoutDashboard className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Make It Possible
                </span>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                AI-powered project management platform trusted by 2,500+ companies worldwide.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-4">Product</h3>
              <ul className="space-y-3">
                <li><Link href="/employee" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Employee Dashboard</Link></li>
                <li><Link href="/lead" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Tech Lead Tools</Link></li>
                <li><Link href="/manager" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Manager Portal</Link></li>
                <li><Link href="/admin" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Admin Panel</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Documentation</a></li>
                <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">API Reference</a></li>
                <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Tutorials</a></li>
                <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-4">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Contact Us</a></li>
                <li><Link href="/settings" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Settings</Link></li>
                <li><a href="#" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Status</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-600"> 2025 Make It Possible. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
