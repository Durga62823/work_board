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
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Dashboard | WorkBoard",
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
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-foreground flex items-center justify-center">
                <HiSquares2X2 className="h-4 w-4 text-background" />
              </div>
              <span className="text-sm font-semibold text-foreground">WorkBoard</span>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="py-20 space-y-6 text-center border-b border-border">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-muted text-xs font-medium text-muted-foreground border border-border">
            <HiSparkles className="h-3 w-3" />
            AI-Enhanced Workforce Management
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight">
            Transform Your Team&apos;s<br />Productivity
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive platform for managing employees, projects, and performance with AI-powered insights and automation.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90">
                Get Started Free
                <HiArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline">
                Login to Dashboard
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="py-16 space-y-8 border-b border-border">
          <div className="rounded-lg border border-border overflow-hidden bg-border">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px">
              {[
                { icon: HiUserGroup, title: "Employee Management", desc: "Track tasks, timesheets, goals, and performance reviews all in one place." },
                { icon: HiFolder, title: "Project Tracking", desc: "Manage projects, sprints, and team workload with Kanban boards and analytics." },
                { icon: HiSparkles, title: "AI-Powered Insights", desc: "Get intelligent recommendations, automated reports, and predictive analytics." },
                { icon: HiChartBar, title: "Performance Analytics", desc: "Real-time dashboards and reports to measure productivity and progress." },
                { icon: HiShieldCheck, title: "Role-Based Access", desc: "Secure dashboards for Admin, Manager, Lead, and Employee roles." },
                { icon: HiBolt, title: "Automation Tools", desc: "Automate approvals, notifications, and repetitive workflows." },
              ].map((feature) => (
                <div key={feature.title} className="bg-background p-6 space-y-3">
                  <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
                    <feature.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="py-16 space-y-10 border-b border-border">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-foreground tracking-tight">How It Works</h2>
            <p className="text-muted-foreground">Get started in minutes with our intuitive platform</p>
          </div>

          <div className="space-y-0">
            {[
              { step: "01", title: "Sign Up", desc: "Create your account and set up your organization profile" },
              { step: "02", title: "Add Your Team", desc: "Invite team members and assign roles based on responsibilities" },
              { step: "03", title: "Start Managing", desc: "Access your role-specific dashboard and start tracking work" },
            ].map((item, i) => (
              <div key={item.step} className={`flex items-start gap-6 py-6 ${i < 2 ? "border-b border-border" : ""}`}>
                <span className="text-xs font-mono font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">{item.step}</span>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Roles Section */}
        <div className="py-16 space-y-10 border-b border-border">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-foreground tracking-tight">Tailored for Every Role</h2>
            <p className="text-muted-foreground">Each role gets a customized dashboard with relevant features</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border rounded-lg overflow-hidden border border-border">
            {[
              { icon: HiShieldCheck, title: "Admin Dashboard", desc: "Full system control with user management, organization settings, and system-wide analytics.", items: ["User & role management", "Organization settings", "Audit logs & security"] },
              { icon: HiArrowTrendingUp, title: "Manager Dashboard", desc: "Team oversight with approvals, performance reviews, and resource optimization.", items: ["Timesheet & PTO approvals", "Team performance analytics", "AI-powered insights"] },
              { icon: HiFolder, title: "Lead Dashboard", desc: "Sprint management with task boards, code reviews, and team coordination.", items: ["Sprint planning & tracking", "Task prioritization AI", "Code review management"] },
              { icon: HiUserGroup, title: "Employee Dashboard", desc: "Personal workspace with tasks, timesheets, goals, and performance tracking.", items: ["Task management", "Time tracking & calendar", "Goals & performance"] },
            ].map((role) => (
              <div key={role.title} className="bg-background p-6">
                <div className="flex items-start gap-4">
                  <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                    <role.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-foreground">{role.title}</h3>
                    <p className="text-xs text-muted-foreground">{role.desc}</p>
                    <ul className="space-y-1.5 pt-1">
                      {role.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <HiCheckCircle className="h-3.5 w-3.5 text-muted-foreground" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 text-center space-y-6 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground tracking-tight">
            Ready to Transform Your Workforce?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Join teams that are already using WorkBoard to streamline their operations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90">
                Start Free Trial
                <HiArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline">
                Login Now
              </Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-foreground flex items-center justify-center">
                  <HiSquares2X2 className="h-3.5 w-3.5 text-background" />
                </div>
                <span className="text-sm font-semibold text-foreground">WorkBoard</span>
              </div>
              <p className="text-xs text-muted-foreground">
                AI-powered workforce management platform for modern teams.
              </p>
            </div>

            {[
              { title: "Product", items: ["Features", "Pricing", "AI Tools", "Integrations"] },
              { title: "Resources", items: ["Documentation", "Help Center", "API Reference", "Status"] },
              { title: "Company", items: ["About", "Blog", "Careers", "Contact"] },
            ].map((section) => (
              <div key={section.title}>
                <h4 className="text-xs font-semibold text-foreground mb-3">{section.title}</h4>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item}>
                      <Link href="/auth/signup" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{item}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © 2025 WorkBoard. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="https://github.com" className="text-muted-foreground hover:text-foreground transition-colors">
                <FaGithub className="h-4 w-4" />
              </Link>
              <Link href="mailto:support@makeitpossible.com" className="text-muted-foreground hover:text-foreground transition-colors">
                <HiEnvelope className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}