"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { HiChatBubbleLeftRight, HiSparkles, HiCheckCircle } from "react-icons/hi2";

interface AITaskAssistantProps {
  onClose?: () => void;
}

export function AITaskAssistant({ onClose }: AITaskAssistantProps) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeFeature, setActiveFeature] = useState<
    "breakdown" | "timeline" | "testcases" | null
  >(null);
  const [result, setResult] = useState<any>(null);

  const handleBreakdown = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setActiveFeature("breakdown");
    setResult(null);

    try {
      const response = await fetch("/api/ai/task-breakdown", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskDescription: input }),
      });

      if (!response.ok) throw new Error("Failed to breakdown task");

      const data = await response.json();
      setResult(data);
    } catch (error: any) {
      alert(error.message || "Failed to breakdown task");
    } finally {
      setLoading(false);
    }
  };

  const handleTimeline = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setActiveFeature("timeline");
    setResult(null);

    try {
      const response = await fetch("/api/ai/timeline-estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskDescription: input }),
      });

      if (!response.ok) throw new Error("Failed to estimate timeline");

      const data = await response.json();
      setResult(data);
    } catch (error: any) {
      alert(error.message || "Failed to estimate timeline");
    } finally {
      setLoading(false);
    }
  };

  const handleTestCases = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setActiveFeature("testcases");
    setResult(null);

    try {
      const response = await fetch("/api/ai/test-cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskDescription: input }),
      });

      if (!response.ok) throw new Error("Failed to generate test cases");

      const data = await response.json();
      setResult(data);
    } catch (error: any) {
      alert(error.message || "Failed to generate test cases");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <HiChatBubbleLeftRight className="h-6 w-6 text-purple-600" />
        <h3 className="text-lg font-semibold">AI Task Assistant</h3>
        <HiSparkles className="h-4 w-4 text-yellow-500" />
      </div>

      <div className="space-y-4">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Describe your task or feature... (e.g., 'Build user authentication system')"
          className="w-full min-h-[100px] p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          disabled={loading}
        />

        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={handleBreakdown}
            disabled={loading || !input.trim()}
            className="flex items-center gap-2"
          >
            {loading && activeFeature === "breakdown" && <Spinner size="sm" />}
            Break into Subtasks
          </Button>
          <Button
            onClick={handleTimeline}
            disabled={loading || !input.trim()}
            variant="outline"
            className="flex items-center gap-2"
          >
            {loading && activeFeature === "timeline" && <Spinner size="sm" />}
            Estimate Timeline
          </Button>
          <Button
            onClick={handleTestCases}
            disabled={loading || !input.trim()}
            variant="outline"
            className="flex items-center gap-2"
          >
            {loading && activeFeature === "testcases" && <Spinner size="sm" />}
            Generate Test Cases
          </Button>
        </div>
      </div>

      {result && activeFeature === "breakdown" && (
        <Card className="p-4 bg-purple-50">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <HiCheckCircle className="h-5 w-5 text-green-600" />
            Subtasks Generated
          </h4>
          <div className="space-y-3">
            {result.subtasks?.map((subtask: any, idx: number) => (
              <div key={idx} className="bg-white p-3 rounded border">
                <div className="flex justify-between items-start mb-1">
                  <h5 className="font-medium">
                    {idx + 1}. {subtask.title}
                  </h5>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      subtask.priority === "high"
                        ? "bg-red-100 text-red-700"
                        : subtask.priority === "medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {subtask.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {subtask.description}
                </p>
                <p className="text-xs text-gray-500">
                  Est: {subtask.estimatedHours}h
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {result && activeFeature === "timeline" && (
        <Card className="p-4 bg-blue-50">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <HiCheckCircle className="h-5 w-5 text-green-600" />
            Timeline Estimate
          </h4>
          <div className="space-y-3">
            <div className="bg-white p-3 rounded">
              <p className="text-sm text-gray-600">Estimated Duration</p>
              <p className="text-2xl font-bold text-blue-600">
                {result.estimatedDays} days
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Complexity:{" "}
                <span className="font-medium">{result.complexity}</span>
              </p>
            </div>
            <div className="bg-white p-3 rounded">
              <h5 className="font-medium mb-2">Key Factors:</h5>
              <ul className="list-disc list-inside text-sm space-y-1">
                {result.factors?.map((factor: string, idx: number) => (
                  <li key={idx} className="text-gray-600">
                    {factor}
                  </li>
                ))}
              </ul>
            </div>
            {result.milestones && result.milestones.length > 0 && (
              <div className="bg-white p-3 rounded">
                <h5 className="font-medium mb-2">Milestones:</h5>
                <div className="space-y-2">
                  {result.milestones.map((milestone: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-700">{milestone.title}</span>
                      <span className="text-gray-500">
                        Day {milestone.daysFromStart}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {result && activeFeature === "testcases" && (
        <Card className="p-4 bg-green-50">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <HiCheckCircle className="h-5 w-5 text-green-600" />
            Test Cases Generated
          </h4>
          <div className="space-y-3">
            {result.testCases?.map((testCase: any, idx: number) => (
              <div key={idx} className="bg-white p-3 rounded border">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-medium">
                    {idx + 1}. {testCase.scenario}
                  </h5>
                  <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
                    {testCase.type}
                  </span>
                </div>
                <div className="text-sm space-y-2">
                  <div>
                    <p className="font-medium text-gray-700">Steps:</p>
                    <ol className="list-decimal list-inside text-gray-600 ml-2">
                      {testCase.steps?.map((step: string, stepIdx: number) => (
                        <li key={stepIdx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">
                      Expected Result:
                    </p>
                    <p className="text-gray-600">{testCase.expectedResult}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
