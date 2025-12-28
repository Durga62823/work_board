"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

interface AnalyticsData {
  summary: {
    totalUsers: number;
    activeUsers: number;
    inactiveUsers: number;
    totalProjects: number;
    completedProjects: number;
    ongoingProjects: number;
    totalAppraisals: number;
    averageRating: number;
  };
  usersByRole: Array<{ role: string; count: number }>;
  projectsByStatus: Array<{ status: string; count: number }>;
  ptoStats: Array<{ status: string; count: number }>;
  timesheetStats: Array<{ status: string; count: number; totalHours: number }>;
}

// Premium Animated Counter Component
function AnimatedCounter({
  value,
  duration = 1200,
}: {
  value: number;
  duration?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smoother animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.floor(value * easeOut));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value, duration]);

  return <span>{displayValue}</span>;
}

// Animated Progress Bar with Premium Effects
function AnimatedProgressBar({
  percentage,
  color = "bg-primary",
}: {
  percentage: number;
  color?: string;
}) {
  const [displayPercentage, setDisplayPercentage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayPercentage(percentage);
    }, 150);

    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="w-full bg-muted/30 rounded-full h-3 overflow-hidden shadow-inner">
      <div
        className={`${color} h-3 rounded-full transition-all duration-1200 ease-out shadow-lg`}
        style={{
          width: `${displayPercentage}%`,
        }}
      />
    </div>
  );
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await fetch("/api/analytics");
        if (!res.ok) throw new Error("Failed to fetch analytics");
        const data = await res.json();
        setAnalytics(data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="p-8">
        <p className="text-destructive">Failed to load analytics data</p>
      </div>
    );
  }

  const engagementPercentage =
    analytics.summary.totalUsers > 0
      ? Math.round(
          (analytics.summary.activeUsers / analytics.summary.totalUsers) * 100
        )
      : 0;

  return (
    <div className="p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary shadow-lg">
              <span className="text-2xl">📊</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Analytics Dashboard
            </h1>
          </div>
          <p className="text-muted-foreground ml-16">
            Real-time organization performance metrics
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Users Card */}
          <Card className="p-6 bg-primary border-0 text-primary-foreground shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="text-5xl">
                👥
              </div>
              <div className="text-xs font-bold bg-primary-foreground/20 px-3 py-1 rounded-full">
                Users
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm font-semibold mb-2">
              Total Users
            </p>
            <p className="text-4xl font-black">
              <AnimatedCounter
                value={analytics.summary.totalUsers}
                duration={1200}
              />
            </p>
            <p className="text-xs text-primary-foreground/70 mt-2">
              Active: {analytics.summary.activeUsers}
            </p>
          </Card>

          {/* Projects Card */}
          <Card className="p-6 bg-primary border-0 text-primary-foreground shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="text-5xl">
                📁
              </div>
              <div className="text-xs font-bold bg-primary-foreground/20 px-3 py-1 rounded-full">
                Projects
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm font-semibold mb-2">
              Total Projects
            </p>
            <p className="text-4xl font-black">
              <AnimatedCounter
                value={analytics.summary.totalProjects}
                duration={1200}
              />
            </p>
            <p className="text-xs text-primary-foreground/70 mt-2">
              Completed: {analytics.summary.completedProjects}
            </p>
          </Card>

          {/* Appraisals Card */}
          <Card className="p-6 bg-primary border-0 text-primary-foreground shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="text-5xl">
                ⭐
              </div>
              <div className="text-xs font-bold bg-primary-foreground/20 px-3 py-1 rounded-full">
                Reviews
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm font-semibold mb-2">
              Appraisals
            </p>
            <p className="text-4xl font-black">
              <AnimatedCounter
                value={analytics.summary.totalAppraisals}
                duration={1200}
              />
            </p>
            <p className="text-xs text-primary-foreground/70 mt-2">
              Avg Rating: {analytics.summary.averageRating.toFixed(1)}
            </p>
          </Card>

          {/* Engagement Card */}
          <Card className="p-6 bg-primary border-0 text-primary-foreground shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="text-5xl">
                📈
              </div>
              <div className="text-xs font-bold bg-primary-foreground/20 px-3 py-1 rounded-full">
                Metric
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm font-semibold mb-2">
              Engagement
            </p>
            <p className="text-4xl font-black">
              <AnimatedCounter
                value={Math.round(
                  (analytics.summary.activeUsers /
                    analytics.summary.totalUsers) *
                    100
                  )}
                  duration={1200}
                />
                %
              </p>
              <p className="text-xs text-primary-foreground/70 mt-2">Active participation</p>
          </Card>
        </div>

        {/* Users by Role & Projects by Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Users by Role */}
          <Card className="p-6 border-border bg-card shadow-lg h-full">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">👤</span>
              <h3 className="text-xl font-bold text-foreground">Users by Role</h3>
            </div>
            <div className="space-y-4">
              {analytics.usersByRole.map((item, idx) => (
                <div key={item.role} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-muted-foreground uppercase tracking-wide">
                      {item.role}
                    </span>
                    <span className="text-sm font-black text-primary">
                      {item.count} users
                    </span>
                  </div>
                  <AnimatedProgressBar
                    percentage={
                      analytics.summary.totalUsers > 0
                        ? (item.count / analytics.summary.totalUsers) * 100
                        : 0
                    }
                    color="bg-primary"
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Projects by Status */}
          <Card className="p-6 border-border bg-card shadow-lg h-full">
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="text-4xl animate-float"
                  style={{ animationDelay: "1s" }}
                >
                  📊
                </span>
                <h3 className="text-2xl font-bold text-foreground">Projects by Status</h3>
              </div>
              <div className="space-y-4">
                {analytics.projectsByStatus.map((item) => (
                  <div key={item.status}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                        {item.status}
                      </span>
                      <span className="text-sm font-bold text-primary">
                        {item.count} projects
                      </span>
                    </div>
                    <AnimatedProgressBar
                      percentage={
                        analytics.summary.totalProjects > 0
                          ? (item.count / analytics.summary.totalProjects) * 100
                          : 0
                      }
                      color="bg-primary"
                    />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* PTO Statistics */}
        <div className="mb-12">
          <Card className="p-6 border-border bg-card shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">🏖️</span>
              <h3 className="text-2xl font-bold text-foreground">PTO Requests</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {analytics.ptoStats.map((item) => (
                <div
                  key={item.status}
                  className="p-6 rounded-lg bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">✈️</span>
                    <span className="text-xs font-bold bg-primary-foreground/20 px-2 py-1 rounded-full">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-4xl font-bold mb-1">
                    <AnimatedCounter value={item.count} duration={1200} />
                  </p>
                  <p className="text-xs text-primary-foreground/70 font-semibold">
                    requests
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Timesheet Statistics */}
        <div>
          <Card className="p-6 border-border bg-card shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">⏱️</span>
              <h3 className="text-2xl font-bold text-foreground">Timesheet Status</h3>
            </div>
            <div className="space-y-4">
              {analytics.timesheetStats.map((item) => (
                <div
                  key={item.status}
                  className="p-4 rounded-lg bg-muted flex items-center justify-between hover:bg-muted/80 hover:shadow-lg transition-all border border-border"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">📋</span>
                    <div>
                      <p className="font-bold text-foreground">{item.status}</p>
                      <p className="text-sm text-muted-foreground font-semibold">
                        <span className="text-primary font-bold">
                          <AnimatedCounter value={item.count} duration={1200} />
                        </span>{" "}
                        submitted
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Total Hours</p>
                    <p className="text-2xl font-bold text-primary">
                      {item.totalHours}h
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    
  );
}
