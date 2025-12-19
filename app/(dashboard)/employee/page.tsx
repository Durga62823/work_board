"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Calendar,
  Target,
  FileText,
  ArrowUpRight,
  Sparkles,
  BarChart3,
  ListTodo,
} from "lucide-react";
import Link from "next/link";

export default function EmployeeDashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 md:p-12 shadow-2xl shadow-blue-500/20">
          <div className="absolute inset-0 bg-grid-white/5" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl" />
          
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              <span className="text-sm font-medium text-white">Employee Dashboard</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              My Dashboard
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Overview of your tasks, performance, and goals
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="relative overflow-hidden border-slate-200/60 bg-white/70 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            <CardContent className="relative pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-blue-100">
                  <ListTodo className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <p className="text-sm font-semibold text-slate-600 mb-1">Active Tasks</p>
              <p className="text-4xl font-bold text-slate-900">12</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-slate-200/60 bg-white/70 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-orange-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            <CardContent className="relative pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-orange-100">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <p className="text-sm font-semibold text-slate-600 mb-1">Due This Week</p>
              <p className="text-4xl font-bold text-slate-900">5</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-slate-200/60 bg-white/70 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-red-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            <CardContent className="relative pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-red-100">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <p className="text-sm font-semibold text-slate-600 mb-1">Overdue</p>
              <p className="text-4xl font-bold text-slate-900">2</p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-slate-200/60 bg-white/70 backdrop-blur-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
            <CardContent className="relative pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-green-100">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <p className="text-sm font-semibold text-slate-600 mb-1">Completed</p>
              <p className="text-4xl font-bold text-slate-900">45</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/employee/my-work">
              <Card className="group relative overflow-hidden border-2 border-blue-200/50 bg-gradient-to-br from-blue-50 to-indigo-50 hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-indigo-400/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <CardContent className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-blue-600 shadow-lg shadow-blue-500/30">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">My Tasks</h3>
                  <p className="text-sm text-slate-600">View and manage your assigned tasks</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/employee/timesheet">
              <Card className="group relative overflow-hidden border-2 border-green-200/50 bg-gradient-to-br from-green-50 to-emerald-50 hover:border-green-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/20 to-emerald-400/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <CardContent className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-green-600 shadow-lg shadow-green-500/30">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-green-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Timesheet</h3>
                  <p className="text-sm text-slate-600">Log and track your hours</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/employee/performance">
              <Card className="group relative overflow-hidden border-2 border-purple-200/50 bg-gradient-to-br from-purple-50 to-pink-50 hover:border-purple-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <CardContent className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-purple-600 shadow-lg shadow-purple-500/30">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-purple-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Performance</h3>
                  <p className="text-sm text-slate-600">View your metrics and progress</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/employee/goals">
              <Card className="group relative overflow-hidden border-2 border-orange-200/50 bg-gradient-to-br from-orange-50 to-amber-50 hover:border-orange-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-amber-400/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <CardContent className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-orange-600 shadow-lg shadow-orange-500/30">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-orange-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">My Goals</h3>
                  <p className="text-sm text-slate-600">Track your goals and objectives</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/employee/calendar">
              <Card className="group relative overflow-hidden border-2 border-teal-200/50 bg-gradient-to-br from-teal-50 to-cyan-50 hover:border-teal-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-400/20 to-cyan-400/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <CardContent className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-teal-600 shadow-lg shadow-teal-500/30">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-teal-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Calendar</h3>
                  <p className="text-sm text-slate-600">View deadlines and milestones</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/employee/appraisal">
              <Card className="group relative overflow-hidden border-2 border-pink-200/50 bg-gradient-to-br from-pink-50 to-rose-50 hover:border-pink-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-400/20 to-rose-400/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />
                <CardContent className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-pink-600 shadow-lg shadow-pink-500/30">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-pink-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Appraisals</h3>
                  <p className="text-sm text-slate-600">Self-appraisal and feedback</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Today'\''s Tasks */}
        <Card className="border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-slate-900">Today'\''s Tasks</CardTitle>
            </div>
            <CardDescription className="text-slate-600">Your priority tasks for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50 border border-blue-200/50 hover:shadow-md transition-all group">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-blue-100">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Update user dashboard UI</p>
                    <p className="text-sm text-slate-600 mt-0.5">Project Alpha  Due today</p>
                  </div>
                </div>
                <Badge className="bg-blue-600 hover:bg-blue-700">In Progress</Badge>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-orange-50 border border-orange-200/50 hover:shadow-md transition-all group">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-orange-100">
                    <Clock className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Code review for PR #123</p>
                    <p className="text-sm text-slate-600 mt-0.5">Project Beta  Due today</p>
                  </div>
                </div>
                <Badge variant="secondary">To Do</Badge>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-red-50 border border-red-200/50 hover:shadow-md transition-all group">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-red-100">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Fix critical bug in payment module</p>
                    <p className="text-sm text-slate-600 mt-0.5">Project Gamma  Overdue</p>
                  </div>
                </div>
                <Badge variant="destructive">Overdue</Badge>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/employee/my-work"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                View all tasks
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
