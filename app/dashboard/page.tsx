import { auth } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { 
  HiSquares2X2, 
  HiUserGroup, 
  HiFolder, 
  HiArrowTrendingUp,
  HiSparkles,
  HiArrowRight,
  HiCheckCircle,
  HiShieldCheck,
  HiChartBar,
  HiBolt,
  HiEnvelope
} from "react-icons/hi2";
import { FaGithub } from "react-icons/fa";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Dashboard | Make It Possible",
};

export default async function DashboardPage() {
  const session = await auth();

  // If user is logged in, redirect to their role-specific dashboard
  if (session?.user) {
    const userRole = session.user.role || "EMPLOYEE";
    
    switch (userRole) {
      case "ADMIN":
        redirect("/admin");
      case "MANAGER":
        redirect("/manager");
      case "LEAD":
        redirect("/lead");
      case "EMPLOYEE":
      default:
        redirect("/employee");
    }
  }

  // Public landing page for non-authenticated users
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-card/80 border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                <HiSquares2X2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-lg font-bold text-primary">
                  Make It Possible
                </span>
                <p className="text-xs text-muted-foreground">AI-Powered Workforce Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/auth/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <HiSparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Enhanced Workforce Management</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            Transform Your Team's<br />
            <span className="text-primary">Productivity</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive platform for managing employees, projects, and performance with AI-powered insights and automation.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link href="/auth/signup">
              <Button size="lg" className="text-lg px-8 py-6">
                Get Started Free
                <HiArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Login to Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-border bg-card hover:shadow-lg transition-all">
            <CardHeader>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <HiUserGroup className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Employee Management</CardTitle>
              <CardDescription>
                Track tasks, timesheets, goals, and performance reviews all in one place.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border bg-card hover:shadow-lg transition-all">
            <CardHeader>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <HiFolder className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Project Tracking</CardTitle>
              <CardDescription>
                Manage projects, sprints, and team workload with Kanban boards and analytics.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border bg-card hover:shadow-lg transition-all">
            <CardHeader>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <HiSparkles className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>AI-Powered Insights</CardTitle>
              <CardDescription>
                Get intelligent recommendations, automated reports, and predictive analytics.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border bg-card hover:shadow-lg transition-all">
            <CardHeader>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <HiChartBar className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Performance Analytics</CardTitle>
              <CardDescription>
                Real-time dashboards and reports to measure productivity and progress.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border bg-card hover:shadow-lg transition-all">
            <CardHeader>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <HiShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Role-Based Access</CardTitle>
              <CardDescription>
                Secure dashboards for Admin, Manager, Lead, and Employee roles.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border bg-card hover:shadow-lg transition-all">
            <CardHeader>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <HiBolt className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Automation Tools</CardTitle>
              <CardDescription>
                Automate approvals, notifications, and repetitive workflows.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* How It Works */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Get started in minutes with our intuitive platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                1
              </div>
              <h3 className="text-xl font-bold text-foreground">Sign Up</h3>
              <p className="text-muted-foreground">
                Create your account and set up your organization profile
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                2
              </div>
              <h3 className="text-xl font-bold text-foreground">Add Your Team</h3>
              <p className="text-muted-foreground">
                Invite team members and assign roles based on responsibilities
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                3
              </div>
              <h3 className="text-xl font-bold text-foreground">Start Managing</h3>
              <p className="text-muted-foreground">
                Access your role-specific dashboard and start tracking work
              </p>
            </div>
          </div>
        </div>

        {/* Role-Specific Dashboards */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Tailored for Every Role
            </h2>
            <p className="text-lg text-muted-foreground">
              Each role gets a customized dashboard with relevant features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <HiShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Admin Dashboard</h3>
                  <p className="text-muted-foreground mb-3">
                    Full system control with user management, organization settings, and system-wide analytics.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <HiCheckCircle className="h-4 w-4 text-primary" />
                      User & role management
                    </li>
                    <li className="flex items-center gap-2">
                      <HiCheckCircle className="h-4 w-4 text-primary" />
                      Organization settings
                    </li>
                    <li className="flex items-center gap-2">
                      <HiCheckCircle className="h-4 w-4 text-primary" />
                      Audit logs & security
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <HiArrowTrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Manager Dashboard</h3>
                  <p className="text-muted-foreground mb-3">
                    Team oversight with approvals, performance reviews, and resource optimization.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <HiCheckCircle className="h-4 w-4 text-primary" />
                      Timesheet & PTO approvals
                    </li>
                    <li className="flex items-center gap-2">
                      <HiCheckCircle className="h-4 w-4 text-primary" />
                      Team performance analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <HiCheckCircle className="h-4 w-4 text-primary" />
                      AI-powered insights
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <HiFolder className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Lead Dashboard</h3>
                  <p className="text-muted-foreground mb-3">
                    Sprint management with task boards, code reviews, and team coordination.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <HiCheckCircle className="h-4 w-4 text-primary" />
                      Sprint planning & tracking
                    </li>
                    <li className="flex items-center gap-2">
                      <HiCheckCircle className="h-4 w-4 text-primary" />
                      Task prioritization AI
                    </li>
                    <li className="flex items-center gap-2">
                      <HiCheckCircle className="h-4 w-4 text-primary" />
                      Code review management
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="border-border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <HiUserGroup className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Employee Dashboard</h3>
                  <p className="text-muted-foreground mb-3">
                    Personal workspace with tasks, timesheets, goals, and performance tracking.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <HiCheckCircle className="h-4 w-4 text-primary" />
                      Task management
                    </li>
                    <li className="flex items-center gap-2">
                      <HiCheckCircle className="h-4 w-4 text-primary" />
                      Time tracking & calendar
                    </li>
                    <li className="flex items-center gap-2">
                      <HiCheckCircle className="h-4 w-4 text-primary" />
                      Goals & performance
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden rounded-3xl bg-primary p-12 text-center">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Transform Your Workforce?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join teams that are already using Make It Possible to streamline their operations
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/auth/signup">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                  Start Free Trial
                  <HiArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10">
                  Login Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center">
                  <HiSquares2X2 className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-bold text-primary">Make It Possible</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered workforce management platform for modern teams.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/auth/signup" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="/auth/signup" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link href="/auth/signup" className="hover:text-primary transition-colors">AI Tools</Link></li>
                <li><Link href="/auth/signup" className="hover:text-primary transition-colors">Integrations</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/auth/signup" className="hover:text-primary transition-colors">Documentation</Link></li>
                <li><Link href="/auth/signup" className="hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link href="/auth/signup" className="hover:text-primary transition-colors">API Reference</Link></li>
                <li><Link href="/auth/signup" className="hover:text-primary transition-colors">Status</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/auth/signup" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link href="/auth/signup" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="/auth/signup" className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link href="/auth/signup" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              � 2025 Make It Possible. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="https://github.com" className="text-muted-foreground hover:text-primary transition-colors">
                <FaGithub className="h-5 w-5" />
              </Link>
              <Link href="mailto:support@makeitpossible.com" className="text-muted-foreground hover:text-primary transition-colors">
                <HiEnvelope className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}