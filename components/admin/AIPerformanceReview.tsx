"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FileText, Star, TrendingUp } from "lucide-react";

export function AIPerformanceReview() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    projectsCompleted: "",
    tasksCompleted: "",
    onTimeDelivery: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    if (!formData.name || !formData.role) {
      alert("Please fill in employee name and role");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/ai/performance-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          role: formData.role,
          projectsCompleted: parseInt(formData.projectsCompleted) || 0,
          tasksCompleted: parseInt(formData.tasksCompleted) || 0,
          onTimeDelivery: parseInt(formData.onTimeDelivery) || 0,
        }),
      });

      if (!response.ok) throw new Error("Failed to generate review");

      const data = await response.json();
      setResult(data);
    } catch (error: any) {
      alert(error.message || "Failed to generate review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="h-6 w-6 text-indigo-600" />
        <h3 className="text-lg font-semibold">Performance Review Assistant</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Employee Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="John Doe"
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Role *</label>
          <input
            type="text"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Senior Developer"
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Projects Completed
          </label>
          <input
            type="number"
            value={formData.projectsCompleted}
            onChange={(e) =>
              setFormData({ ...formData, projectsCompleted: e.target.value })
            }
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="0"
            min="0"
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Tasks Completed
          </label>
          <input
            type="number"
            value={formData.tasksCompleted}
            onChange={(e) =>
              setFormData({ ...formData, tasksCompleted: e.target.value })
            }
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="0"
            min="0"
            disabled={loading}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            On-Time Delivery %
          </label>
          <input
            type="number"
            value={formData.onTimeDelivery}
            onChange={(e) =>
              setFormData({ ...formData, onTimeDelivery: e.target.value })
            }
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="0"
            min="0"
            max="100"
            disabled={loading}
          />
        </div>
      </div>

      <Button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full md:w-auto"
      >
        {loading && <Spinner size="sm" className="mr-2" />}
        Generate Review
      </Button>

      {result && (
        <div className="space-y-4 mt-6">
          <Card className="p-4 bg-indigo-50">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-lg">
                Performance Review: {formData.name}
              </h4>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="text-2xl font-bold text-indigo-600">
                  {result.overallScore}/10
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-700 bg-white p-3 rounded">
              {result.summary}
            </p>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <h5 className="font-semibold mb-2 flex items-center gap-2 text-green-700">
                <TrendingUp className="h-4 w-4" />
                Strengths
              </h5>
              <ul className="space-y-1">
                {result.strengths?.map((strength: string, idx: number) => (
                  <li key={idx} className="text-sm flex items-start gap-2">
                    <span className="text-green-600 mt-1">✓</span>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-4">
              <h5 className="font-semibold mb-2 text-orange-700">
                Areas for Improvement
              </h5>
              <ul className="space-y-1">
                {result.areasForImprovement?.map(
                  (area: string, idx: number) => (
                    <li key={idx} className="text-sm flex items-start gap-2">
                      <span className="text-orange-600 mt-1">→</span>
                      <span>{area}</span>
                    </li>
                  )
                )}
              </ul>
            </Card>
          </div>

          <Card className="p-4">
            <h5 className="font-semibold mb-2">Key Accomplishments</h5>
            <ul className="space-y-1">
              {result.accomplishments?.map(
                (accomplishment: string, idx: number) => (
                  <li key={idx} className="text-sm flex items-start gap-2">
                    <span className="text-blue-600 mt-1">★</span>
                    <span>{accomplishment}</span>
                  </li>
                )
              )}
            </ul>
          </Card>

          <Card className="p-4">
            <h5 className="font-semibold mb-2">Recommendations</h5>
            <ul className="space-y-1">
              {result.recommendations?.map(
                (recommendation: string, idx: number) => (
                  <li key={idx} className="text-sm flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>{recommendation}</span>
                  </li>
                )
              )}
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}
