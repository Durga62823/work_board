"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { format } from "date-fns";
import { createSprint } from "@/app/actions/lead-tasks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const sprintSchema = z.object({
  name: z.string().min(1, "Sprint name is required"),
  goal: z.string().min(1, "Sprint goal is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  capacityHours: z.coerce.number().min(1, "Capacity must be at least 1 hour"),
});

type SprintFormData = z.infer<typeof sprintSchema>;

export default function NewSprintPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SprintFormData>({
    resolver: zodResolver(sprintSchema),
    defaultValues: {
      capacityHours: 320, // Default 2-week sprint with 4 people at 40h/week
    },
  });

  const onSubmit = (data: SprintFormData) => {
    startTransition(async () => {
      const result = await createSprint({
        name: data.name,
        goal: data.goal,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        capacityHours: data.capacityHours,
      });

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Sprint created successfully");
      router.push("/lead/sprints");
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Link
            href="/lead/sprints"
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back to Sprints
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Create New Sprint</h1>
        <p className="text-gray-600 mt-1">Set up a new sprint for your team</p>
      </div>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Sprint Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Sprint Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Sprint 15 - Q1 2025"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Sprint Goal */}
          <div className="space-y-2">
            <Label htmlFor="goal">Sprint Goal *</Label>
            <textarea
              id="goal"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., Complete user authentication and dashboard redesign"
              {...register("goal")}
            />
            {errors.goal && (
              <p className="text-sm text-red-600">{errors.goal.message}</p>
            )}
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                {...register("startDate")}
              />
              {errors.startDate && (
                <p className="text-sm text-red-600">{errors.startDate.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date *</Label>
              <Input
                id="endDate"
                type="date"
                {...register("endDate")}
              />
              {errors.endDate && (
                <p className="text-sm text-red-600">{errors.endDate.message}</p>
              )}
            </div>
          </div>

          {/* Capacity */}
          <div className="space-y-2">
            <Label htmlFor="capacityHours">Team Capacity (hours) *</Label>
            <Input
              id="capacityHours"
              type="number"
              min="1"
              placeholder="320"
              {...register("capacityHours")}
            />
            {errors.capacityHours && (
              <p className="text-sm text-red-600">{errors.capacityHours.message}</p>
            )}
            <p className="text-sm text-gray-500">
              Estimate total available hours for the sprint (e.g., 4 people × 40h/week × 2 weeks = 320h)
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t">
            <Button
              type="submit"
              disabled={isPending}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isPending ? "Creating..." : "Create Sprint"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/lead/sprints")}
              disabled={isPending}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>

      {/* Tips */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Sprint Planning Tips</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Keep sprints between 1-4 weeks (2 weeks is most common)</li>
          <li>• Set a clear, achievable goal that the team can rally around</li>
          <li>• Account for holidays, meetings, and buffer time in capacity</li>
          <li>• Review velocity from past sprints to guide planning</li>
        </ul>
      </div>
    </div>
  );
}
