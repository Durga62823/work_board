"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bot,
  Shield as ShieldIcon,
  FileText,
  MessageSquare,
  Calendar,
  Sparkles,
} from "lucide-react";
import { AITaskAssistant } from "@/components/admin/AITaskAssistant";
import { AIRiskAssessment } from "@/components/admin/AIRiskAssessment";
import { AIPerformanceReview } from "@/components/admin/AIPerformanceReview";
import { AIMeetingSummary } from "@/components/admin/AIMeetingSummary";
import { AISprintPlanning } from "@/components/admin/AISprintPlanning";

type AIFeature =
  | "task-assistant"
  | "risk-assessment"
  | "performance-review"
  | "meeting-summary"
  | "sprint-planning"
  | null;

export default function AIFeaturesPage() {
  const [activeFeature, setActiveFeature] = useState<AIFeature>(null);

  const features = [
    {
      id: "task-assistant" as const,
      title: "AI Task Assistant",
      description:
        "Break down tasks, estimate timelines, and generate test cases",
      icon: Bot,
      gradient: "from-red-500 to-orange-500",
    },
    {
      id: "risk-assessment" as const,
      title: "Smart Risk Assessment",
      description:
        "Identify bottlenecks and get resource allocation suggestions",
      icon: ShieldIcon,
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: "performance-review" as const,
      title: "Performance Review Assistant",
      description:
        "Generate comprehensive performance reviews for team members",
      icon: FileText,
      gradient: "from-red-600 to-orange-600",
    },
    {
      id: "meeting-summary" as const,
      title: "Meeting Summary Generator",
      description: "Transform meeting transcripts into actionable summaries",
      icon: MessageSquare,
      gradient: "from-orange-600 to-red-600",
    },
    {
      id: "sprint-planning" as const,
      title: "Smart Sprint Planning",
      description: "AI-powered sprint planning with capacity analysis",
      icon: Calendar,
      gradient: "from-red-500 to-orange-500",
    },
  ];

  const renderFeature = () => {
    switch (activeFeature) {
      case "task-assistant":
        return <AITaskAssistant />;
      case "risk-assessment":
        return <AIRiskAssessment />;
      case "performance-review":
        return <AIPerformanceReview />;
      case "meeting-summary":
        return <AIMeetingSummary />;
      case "sprint-planning":
        return <AISprintPlanning />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-red-50 to-orange-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with gradient badge */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 shadow-lg">
              <Sparkles className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                Admin - AI-Powered Features
              </h1>
            </div>
          </div>
          <p className="text-slate-600 text-lg ml-20">
            Leverage artificial intelligence to enhance project management efficiency
          </p>
        </div>

        {!activeFeature ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.id}
                  className="p-6 cursor-pointer border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-red-300"
                  onClick={() => setActiveFeature(feature.id)}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`p-4 rounded-full bg-gradient-to-br ${feature.gradient} mb-4 shadow-lg`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-slate-800">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">{feature.description}</p>
                    <Button 
                      className="mt-2 w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white" 
                      variant="default"
                    >
                      Open Feature
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <div>
            <Button
              onClick={() => setActiveFeature(null)}
              variant="outline"
              className="mb-4 border-red-200 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 hover:text-red-700 transition-all"
            >
              ← Back to Features
            </Button>
            <Card className="p-6 border-slate-200/60 bg-white/70 backdrop-blur-sm shadow-lg">
              {renderFeature()}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
