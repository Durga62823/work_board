"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HiUserGroup, HiArrowTrendingUp, HiCheckCircle, HiSparkles } from "react-icons/hi2";
import { TeamPerformanceAnalytics } from "@/components/manager/TeamPerformanceAnalytics";
import { ResourceOptimization } from "@/components/manager/ResourceOptimization";
import { ApprovalAssistant } from "@/components/manager/ApprovalAssistant";
import { ReportGeneration } from "@/components/shared/ReportGeneration";

type AIFeature =
  | "team-performance"
  | "resource-optimization"
  | "approval-assistant"
  | "report-generation"
  | null;

export default function ManagerAIFeaturesPage() {
  const [activeFeature, setActiveFeature] = useState<AIFeature>(null);

  const features = [
    {
      id: "team-performance" as const,
      title: "Team Performance Analytics",
      description:
        "Analyze team productivity, identify trends, and detect burnout risks",
      icon: HiUserGroup,
    },
    {
      id: "resource-optimization" as const,
      title: "Resource Optimization",
      description:
        "Optimize team allocation, identify conflicts, and predict hiring needs",
      icon: HiArrowTrendingUp,
    },
    {
      id: "approval-assistant" as const,
      title: "Approval Assistant",
      description: "Get AI recommendations for timesheet and PTO approvals",
      icon: HiCheckCircle,
    },
    {
      id: "report-generation" as const,
      title: "Smart Report Generator",
      description: "Generate comprehensive project reports with insights",
      icon: HiSparkles,
    },
  ];

  const renderFeature = () => {
    switch (activeFeature) {
      case "team-performance":
        return <TeamPerformanceAnalytics />;
      case "resource-optimization":
        return <ResourceOptimization />;
      case "approval-assistant":
        return <ApprovalAssistant />;
      case "report-generation":
        return <ReportGeneration />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg">
            <HiSparkles className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-primary">
              Manager - AI Features
            </h1>
            <p className="mt-1 text-primary">
              AI-powered tools to enhance team management and decision-making
            </p>
          </div>
        </div>

        {!activeFeature ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.id}
                  className="group rounded-2xl border border-border bg-card backdrop-blur-sm shadow-lg p-6 cursor-pointer transition-all hover:shadow-2xl hover:scale-105 hover:border-primary/50"
                  onClick={() => setActiveFeature(feature.id)}
                >
                  <div className="flex flex-col">
                    <div
                      className="p-4 rounded-xl bg-primary/10 w-fit mb-4 group-hover:shadow-md transition-all"
                    >
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-primary mb-4 flex-1">
                      {feature.description}
                    </p>
                    <Button 
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg transition-all"
                    >
                      Open Feature
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            <Button
              onClick={() => setActiveFeature(null)}
              variant="outline"
              className="mb-4 border-border hover:bg-muted hover:border-primary"
            >
              ← Back to Features
            </Button>
            <div className="rounded-2xl border border-border bg-card backdrop-blur-sm shadow-lg p-6">
              {renderFeature()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
