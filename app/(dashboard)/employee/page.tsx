"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Calendar,
  Target,
  FileText,
} from "lucide-react";
import Link from "next/link";

export default function EmployeeDashboardPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
        <p className="text-gray-600">
          Overview of your tasks, performance, and goals
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Tasks</p>
              <p className="text-3xl font-bold">12</p>
            </div>
            <CheckCircle className="h-10 w-10 text-blue-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Due This Week</p>
              <p className="text-3xl font-bold">5</p>
            </div>
            <Clock className="h-10 w-10 text-orange-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Overdue</p>
              <p className="text-3xl font-bold">2</p>
            </div>
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Completed</p>
              <p className="text-3xl font-bold">45</p>
            </div>
            <TrendingUp className="h-10 w-10 text-green-500" />
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/employee/my-work">
            <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-blue-300">
              <div className="flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-blue-100 mb-4">
                  <CheckCircle className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">My Tasks</h3>
                <p className="text-sm text-gray-600">
                  View and manage your assigned tasks
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/employee/timesheet">
            <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-green-300">
              <div className="flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-green-100 mb-4">
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Timesheet</h3>
                <p className="text-sm text-gray-600">
                  Log and track your hours
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/employee/performance">
            <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-purple-300">
              <div className="flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-purple-100 mb-4">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Performance</h3>
                <p className="text-sm text-gray-600">
                  View your metrics and progress
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/employee/goals">
            <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-orange-300">
              <div className="flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-orange-100 mb-4">
                  <Target className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">My Goals</h3>
                <p className="text-sm text-gray-600">
                  Track your goals and objectives
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/employee/calendar">
            <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-teal-300">
              <div className="flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-teal-100 mb-4">
                  <Calendar className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Calendar</h3>
                <p className="text-sm text-gray-600">
                  View deadlines and milestones
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/employee/appraisal">
            <Card className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-pink-300">
              <div className="flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-pink-100 mb-4">
                  <FileText className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Appraisals</h3>
                <p className="text-sm text-gray-600">
                  Self-appraisal and feedback
                </p>
              </div>
            </Card>
          </Link>
        </div>
      </div>

      {/* Today's Tasks */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Today's Tasks</h2>
        <Card className="p-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Update user dashboard UI</p>
                  <p className="text-sm text-gray-600">
                    Project Alpha • Due today
                  </p>
                </div>
              </div>
              <Badge variant="default">In Progress</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium">Code review for PR #123</p>
                  <p className="text-sm text-gray-600">
                    Project Beta • Due today
                  </p>
                </div>
              </div>
              <Badge variant="secondary">To Do</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium">
                    Fix critical bug in payment module
                  </p>
                  <p className="text-sm text-gray-600">
                    Project Gamma • Overdue
                  </p>
                </div>
              </div>
              <Badge variant="destructive">Overdue</Badge>
            </div>
          </div>

          <div className="mt-4 text-center">
            <Link
              href="/employee/my-work"
              className="text-blue-600 hover:underline text-sm"
            >
              View all tasks →
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
