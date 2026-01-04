"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  HiArrowTrendingUp,
  HiArrowTrendingDown,
  HiFlag,
  HiClock,
  HiCheckCircle,
  HiSparkles,
} from "react-icons/hi2";
import { ImSpinner2 } from "react-icons/im";
import {
  getMyPerformanceMetrics,
  getTaskCompletionStats,
  getTimeEstimationAccuracy,
  getMonthlyPerformanceTrend,
  getProjectPerformance,
} from "@/app/actions/employee-performance";

interface PerformanceMetric {
  id: string;
  metric: string;
  metricType?: string;
  value: number;
  period: string;
  recordedAt: Date;
  project: {
    id: string;
    name: string;
  } | null;
}

interface TaskStats {
  totalTasks: number;
  completedTasks: number;
  onTimeTasks: number;
  completionRate: number;
  onTimeRate: number;
}

interface TimeAccuracy {
  totalEstimated: number;
  totalActual: number;
  accuracy: number;
  variance: number;
}

interface CodeQuality {
  totalReviews: number;
  averageScore: number;
  issuesFound: number;
  issuesResolved: number;
}

interface ProductivityTrend {
  period: string;
  tasksCompleted: number;
  hoursLogged: number;
  averageTaskTime: number;
}

export default function PerformancePage() {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([]);
  const [taskStats, setTaskStats] = useState<TaskStats | null>(null);
  const [timeAccuracy, setTimeAccuracy] = useState<TimeAccuracy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllData();
  }, []);

  async function loadAllData() {
    setLoading(true);

    const [metricsRes, taskRes, timeRes] = await Promise.all([
      getMyPerformanceMetrics(),
      getTaskCompletionStats(),
      getTimeEstimationAccuracy(),
    ]);

    if (metricsRes.success && metricsRes.data) {
      setMetrics(metricsRes.data);
    }
    if (taskRes.success && taskRes.data) {
      setTaskStats(taskRes.data);
    }
    if (timeRes.success && timeRes.data) {
      setTimeAccuracy(timeRes.data);
    }

    setLoading(false);
  }

  function getScoreColor(score: number) {
    if (score >= 80) return "text-primary";
    if (score >= 60) return "text-primary";
    return "text-primary";
  }

  function getScoreBadge(score: number) {
    if (score >= 80) return "bg-primary/10 text-primary dark:bg-primary/20";
    if (score >= 60) return "bg-primary/10 text-primary dark:bg-primary/20";
    return "bg-destructive/10 text-destructive dark:bg-destructive/20";
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ImSpinner2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
      
          <div>
            <h1 className="text-3xl font-bold text-primary">
              My Performance
            </h1>
            <p className="text-foreground mt-1">
              Track your performance metrics and productivity
            </p>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {taskStats && (
            <>
              <Card className="border-2 border-transparent hover:border-primary bg-card backdrop-blur-sm shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardDescription className="font-medium text-primary">Task Completion</CardDescription>
                 
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">
                    {taskStats.completionRate}%
                  </div>
                <p className="text-xs text-primary/80 mt-1">
                  {taskStats.completedTasks} of {taskStats.totalTasks} tasks
                </p>
              </CardContent>
            </Card>

              <Card className="border-2 border-transparent hover:border-primary bg-card backdrop-blur-sm shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardDescription className="font-medium text-primary">On-Time Delivery</CardDescription>
              
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">
                    {taskStats.onTimeRate}%
                  </div>
                <p className="text-xs text-primary/80 mt-1">
                  {taskStats.onTimeTasks} tasks delivered on time
                </p>
              </CardContent>
            </Card>
          </>
        )}

          {timeAccuracy && (
            <Card className="border-2 border-transparent hover:border-primary bg-card backdrop-blur-sm shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription className="font-medium text-primary">Estimation Accuracy</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">
                  {Math.round(timeAccuracy.accuracy)}%
                </div>
              <p className="text-xs text-primary/80 mt-1">
                {timeAccuracy.variance > 0 ? "+" : ""}
                {Math.round(timeAccuracy.variance)}% variance
              </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Time Estimation Details */}
        {timeAccuracy && (
          <Card className="border-border bg-card backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary">Time Estimation Analysis</CardTitle>
            <CardDescription className="text-foreground">
              How accurately you estimate task durations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-sm text-primary">
                  Total Estimated Hours
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {timeAccuracy.totalEstimated.toFixed(1)}h
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-primary">
                  Total Actual Hours
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {timeAccuracy.totalActual.toFixed(1)}h
                </p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                {timeAccuracy.variance > 0 ? (
                  <HiArrowTrendingUp className="h-5 w-5 text-destructive" />
                ) : (
                  <HiArrowTrendingDown className="h-5 w-5 text-primary" />
                )}
                <span className="text-sm text-foreground">
                  {timeAccuracy.variance > 0
                    ? "Over-estimated by"
                    : "Under-estimated by"}{" "}
                  {Math.abs(Math.round(timeAccuracy.variance))}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

        {/* Recent Performance Metrics */}
        {metrics.length > 0 && (
          <Card className="border-border bg-card backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-primary">Recent Metrics</CardTitle>
            <CardDescription>
              Detailed performance metrics by project
            </CardDescription>
          </CardHeader>
          <CardContent>
              <div className="space-y-3">
                {metrics.map((metric) => (
                  <div
                    key={metric.id}
                    className="flex items-center justify-between p-3 border-2 border-transparent hover:border-primary rounded-xl bg-card/50 backdrop-blur-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-card-foreground text-foreground">
                        {(metric.metricType || metric.metric).replace("_", " ")}
                      </p>
                      {metric.project && (
                        <Badge variant="outline" className="text-primary">{metric.project.name}</Badge>
                      )}
                    </div>
                    <p className="text-sm text-primary/80 mt-1">
                      {new Date(metric.recordedAt).toLocaleDateString()} ·{" "}
                      {metric.period}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge className={getScoreBadge(metric.value)}>
                      {metric.value}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

        {metrics.length === 0 && taskStats?.totalTasks === 0 && (
          <Card className="border-border bg-card backdrop-blur-sm shadow-lg">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <HiArrowTrendingUp className="h-12 w-12 text-primary/50 mb-4" />
            <p className="text-primary text-center">
              No performance data available yet. Complete tasks to see your
              metrics!
            </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
