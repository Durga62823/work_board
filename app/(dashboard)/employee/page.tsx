"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  HiCheckCircle,
  HiClock,
  HiExclamationCircle,
  HiArrowTrendingUp,
  HiCalendar,
  HiFlag,
  HiDocumentText,
  HiArrowTopRightOnSquare,
  HiSparkles,
  HiChartBarSquare,
  HiListBullet,
} from "react-icons/hi2";
import Link from "next/link";

export default function EmployeeDashboardPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-8xl mx-auto space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl bg-card border-2 border-primary/20 p-8 md:p-12 shadow-2xl">
          <div className="absolute inset-0 bg-grid-primary/5" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 mb-4">
             
              <span className="text-sm font-medium text-primary">Employee Dashboard</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4 leading-tight">
              My Dashboard
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Overview of your tasks, performance, and goals
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 cursor-pointer gap-4">
          <Card className="relative overflow-hidden border-2 border-border bg-card backdrop-blur-sm hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            <CardContent className="relative pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <HiListBullet className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="text-sm font-semibold text-primary mb-1">Active Tasks</p>
              <p className="text-4xl font-bold text-foreground">12</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-2 border-border bg-card backdrop-blur-sm hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            <CardContent className="relative pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <HiClock className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="text-sm font-semibold text-primary mb-1">Due This Week</p>
              <p className="text-4xl font-bold text-foreground">5</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-2 border-border bg-card backdrop-blur-sm hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            <CardContent className="relative pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <HiExclamationCircle className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="text-sm font-semibold text-primary mb-1">Overdue</p>
              <p className="text-4xl font-bold text-foreground">2</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-2 border-border bg-card backdrop-blur-sm hover:border-primary hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            <CardContent className="relative pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <HiArrowTrendingUp className="h-6 w-6 text-primary" />
                </div>
              </div>
              <p className="text-sm font-semibold text-primary mb-1">Completed</p>
              <p className="text-4xl font-bold text-foreground">45</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/employee/my-work">
              <Card className="group relative overflow-hidden border-2 border-primary/20 bg-card hover:border-primary hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <CardContent className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <HiCheckCircle className="h-6 w-6 text-primary" />
                    </div>
                    <HiArrowTopRightOnSquare className="h-5 w-5 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">My Tasks</h3>
                  <p className="text-sm text-muted-foreground">View and manage your assigned tasks</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/employee/timesheet">
              <Card className="group relative overflow-hidden border-2 border-primary/20 bg-card hover:border-primary hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <CardContent className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <HiClock className="h-6 w-6 text-primary" />
                    </div>
                    <HiArrowTopRightOnSquare className="h-5 w-5 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">Timesheet</h3>
                  <p className="text-sm text-muted-foreground">Log and track your hours</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/employee/performance">
              <Card className="group relative overflow-hidden border-2 border-primary/20 bg-card hover:border-primary hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <CardContent className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <HiChartBarSquare className="h-6 w-6 text-primary" />
                    </div>
                    <HiArrowTopRightOnSquare className="h-5 w-5 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">Performance</h3>
                  <p className="text-sm text-muted-foreground">View your metrics and progress</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/employee/goals">
              <Card className="group relative overflow-hidden border-2 border-primary/20 bg-card hover:border-primary hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <CardContent className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <HiFlag className="h-6 w-6 text-primary" />
                    </div>
                    <HiArrowTopRightOnSquare className="h-5 w-5 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">My Goals</h3>
                  <p className="text-sm text-muted-foreground">Track your goals and objectives</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/employee/calendar">
              <Card className="group relative overflow-hidden border-2 border-primary/20 bg-card hover:border-primary hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <CardContent className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <HiCalendar className="h-6 w-6 text-primary" />
                    </div>
                    <HiArrowTopRightOnSquare className="h-5 w-5 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">Calendar</h3>
                  <p className="text-sm text-muted-foreground">View deadlines and milestones</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/employee/appraisal">
              <Card className="group relative overflow-hidden border-2 border-primary/20 bg-card hover:border-primary hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <CardContent className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <HiDocumentText className="h-6 w-6 text-primary" />
                    </div>
                    <HiArrowTopRightOnSquare className="h-5 w-5 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2">Appraisals</h3>
                  <p className="text-sm text-muted-foreground">Self-appraisal and feedback</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Today'\''s Tasks */}
        <Card className="border-border bg-card backdrop-blur-sm shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <HiCheckCircle className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">Today's Tasks</CardTitle>
            </div>
            <CardDescription className="text-muted-foreground">Your priority tasks for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-xl bg-primary/10 border-2 border-primary/30 hover:border-primary hover:shadow-md transition-all group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <HiCheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Update user dashboard UI</p>
                    <p className="text-sm text-muted-foreground mt-0.5">Project Alpha  Due today</p>
                  </div>
                </div>
                <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">In Progress</Badge>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-primary/10 border-2 border-primary/30 hover:border-primary hover:shadow-md transition-all group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <HiClock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Code review for PR #123</p>
                    <p className="text-sm text-muted-foreground mt-0.5">Project Beta  Due today</p>
                  </div>
                </div>
                <Badge variant="secondary">To Do</Badge>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-primary/10 border-2 border-primary/30 hover:border-primary hover:shadow-md transition-all group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <HiExclamationCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Fix critical bug in payment module</p>
                    <p className="text-sm text-muted-foreground mt-0.5">Project Gamma  Overdue</p>
                  </div>
                </div>
                <Badge variant="secondary">Overdue</Badge>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/employee/my-work"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                View all tasks
                <HiArrowTopRightOnSquare className="h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
