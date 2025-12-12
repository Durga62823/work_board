'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Target, Award, Clock } from 'lucide-react';

interface PerformanceMetric {
  label: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
  change: number;
}

const metrics: PerformanceMetric[] = [
  { label: 'Tasks Completed', value: 45, unit: 'tasks', trend: 'up', change: 12 },
  { label: 'On-Time Delivery', value: 92, unit: '%', trend: 'up', change: 5 },
  { label: 'Avg Cycle Time', value: 2.3, unit: 'days', trend: 'down', change: -15 },
  { label: 'Quality Score', value: 4.8, unit: '/5', trend: 'up', change: 8 }
];

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  badge: string;
}

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Sprint Champion',
    description: 'Completed all sprint tasks on time',
    date: 'Dec 2025',
    badge: '🏆'
  },
  {
    id: '2',
    title: 'Code Quality Pro',
    description: 'Zero bugs in production for 2 months',
    date: 'Nov 2025',
    badge: '⭐'
  },
  {
    id: '3',
    title: 'Team Player',
    description: 'Helped 5+ teammates this month',
    date: 'Nov 2025',
    badge: '🤝'
  }
];

export default function PerformancePage() {
  const [period, setPeriod] = useState<'month' | 'quarter' | 'year'>('month');

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Performance Dashboard</h1>
          <p className="text-gray-600">
            Track your performance metrics and achievements
          </p>
        </div>
        <div className="flex gap-2">
          {(['month', 'quarter', 'year'] as const).map((p) => (
            <Button
              key={p}
              variant={period === p ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPeriod(p)}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-full bg-blue-100">
                {metric.label.includes('Tasks') && <Target className="h-6 w-6 text-blue-600" />}
                {metric.label.includes('Time') && <Clock className="h-6 w-6 text-blue-600" />}
                {metric.label.includes('Quality') && <Award className="h-6 w-6 text-blue-600" />}
                {metric.label.includes('On-Time') && <TrendingUp className="h-6 w-6 text-blue-600" />}
              </div>
              {metric.trend === 'up' && (
                <Badge className="bg-green-100 text-green-700">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{metric.change}%
                </Badge>
              )}
              {metric.trend === 'down' && (
                <Badge className="bg-red-100 text-red-700">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  {metric.change}%
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
            <p className="text-3xl font-bold">
              {metric.value}
              <span className="text-lg text-gray-500 ml-1">{metric.unit}</span>
            </p>
          </Card>
        ))}
      </div>

      {/* Performance Chart */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Performance Trend</h3>
        <div className="h-64 flex items-end justify-between gap-2">
          {[65, 72, 68, 80, 85, 82, 92, 88, 95, 90, 92, 94].map((value, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors" style={{ height: `${value}%` }} />
              <span className="text-xs text-gray-500">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Achievements */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Recent Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-4xl mb-3">{achievement.badge}</div>
              <h4 className="font-semibold mb-2">{achievement.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
              <p className="text-xs text-gray-500">{achievement.date}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Task Breakdown</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Completed</span>
                <span className="font-semibold">45 tasks</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: '75%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">In Progress</span>
                <span className="font-semibold">8 tasks</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '15%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Pending</span>
                <span className="font-semibold">6 tasks</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-gray-400 rounded-full" style={{ width: '10%' }} />
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Time Estimation Accuracy</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Estimated Total</span>
              <span className="font-semibold">240h</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Actual Total</span>
              <span className="font-semibold">228h</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Accuracy Rate</span>
              <Badge className="bg-green-100 text-green-700">95%</Badge>
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-600">
                You're consistently delivering within estimated timeframes. Great job! 🎯
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Feedback Section */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Recent Feedback</h3>
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-blue-100">
                <Award className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium mb-1">Great work on Project Alpha!</p>
                <p className="text-sm text-gray-600">
                  Your attention to detail and proactive communication helped us deliver ahead of schedule.
                </p>
                <p className="text-xs text-gray-500 mt-2">From: Sarah (Manager) - Dec 5, 2025</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-green-100">
                <Award className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium mb-1">Excellent code quality</p>
                <p className="text-sm text-gray-600">
                  The refactoring you did on the authentication module significantly improved our codebase.
                </p>
                <p className="text-xs text-gray-500 mt-2">From: John (Tech Lead) - Nov 28, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
