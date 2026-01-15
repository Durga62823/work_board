"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
      gradient: "from-primary to-primary",
    },
    {
      id: "risk-assessment" as const,
      title: "Smart Risk Assessment",
      description:
        "Identify bottlenecks and get resource allocation suggestions",
      gradient: "from-primary to-primary",
    },
    {
      id: "performance-review" as const,
      title: "Performance Review Assistant",
      description:
        "Generate comprehensive performance reviews for team members",
      gradient: "from-primary to-primary",
    },
    {
      id: "meeting-summary" as const,
      title: "Meeting Summary Generator",
      description: "Transform meeting transcripts into actionable summaries",
      gradient: "from-primary to-primary",
    },
    {
      id: "sprint-planning" as const,
      title: "Smart Sprint Planning",
      description: "AI-powered sprint planning with capacity analysis",
      gradient: "from-primary to-primary",
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
    <div className="p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with gradient badge */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div>
              <h1 className="text-4xl font-bold text-primary">
                AI-Powered Features
              </h1>
            </div>
          </div>
          <p className="text-muted-foreground text-lg ml-20">
            Leverage artificial intelligence to enhance project management efficiency
          </p>
        </div>

        {!activeFeature ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card
                key={feature.id}
                className="p-6 cursor-pointer border-2 border-transparent bg-card backdrop-blur-sm shadow-lg hover:border-primary hover:shadow-xl transition-all duration-300"
                onClick={() => setActiveFeature(feature.id)}
              >
                <div className="flex flex-col items-center text-center">
                  <h3 className="font-semibold text-lg mb-2 text-primary">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                  <Button 
                    className="mt-2 w-full bg-primary hover:bg-primary/90 text-primary-foreground" 
                    variant="default"
                  >
                    Open Feature
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div>
            <Button
              onClick={() => setActiveFeature(null)}
              variant="outline"
              className="mb-4 border-border hover:bg-muted hover:text-foreground transition-all"
            >
              ← Back to Features
            </Button>
            <Card className="p-6 border-2 border-transparent bg-card backdrop-blur-sm shadow-lg hover:border-primary hover:shadow-xl transition-all duration-300">
              {renderFeature()}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
