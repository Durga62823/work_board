'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Target, TrendingUp, Plus, CheckCircle, Circle } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'technical' | 'professional' | 'personal';
  priority: 'low' | 'medium' | 'high';
  progress: number;
  target: number;
  unit: string;
  dueDate: string;
  status: 'on-track' | 'at-risk' | 'completed';
  milestones: Milestone[];
}

interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  dueDate: string;
}

const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Master React Performance Optimization',
    description: 'Deep dive into React performance patterns and best practices',
    category: 'technical',
    priority: 'high',
    progress: 7,
    target: 10,
    unit: 'courses',
    dueDate: '2026-03-31',
    status: 'on-track',
    milestones: [
      { id: 'm1', title: 'Complete advanced hooks course', completed: true, dueDate: '2025-12-15' },
      { id: 'm2', title: 'Build performance demo project', completed: false, dueDate: '2026-01-15' },
      { id: 'm3', title: 'Present findings to team', completed: false, dueDate: '2026-02-01' }
    ]
  },
  {
    id: '2',
    title: 'Deliver 3 Major Features',
    description: 'Successfully deliver 3 major features end-to-end',
    category: 'professional',
    priority: 'high',
    progress: 2,
    target: 3,
    unit: 'features',
    dueDate: '2026-06-30',
    status: 'on-track',
    milestones: [
      { id: 'm4', title: 'Feature 1: User Dashboard', completed: true, dueDate: '2025-12-01' },
      { id: 'm5', title: 'Feature 2: Analytics Module', completed: true, dueDate: '2026-02-01' },
      { id: 'm6', title: 'Feature 3: API Integration', completed: false, dueDate: '2026-05-01' }
    ]
  },
  {
    id: '3',
    title: 'Mentor Junior Developers',
    description: 'Actively mentor and support 2 junior team members',
    category: 'personal',
    priority: 'medium',
    progress: 12,
    target: 20,
    unit: 'sessions',
    dueDate: '2026-12-31',
    status: 'on-track',
    milestones: [
      { id: 'm7', title: 'Complete onboarding sessions', completed: true, dueDate: '2025-11-30' },
      { id: 'm8', title: 'Code review sessions', completed: false, dueDate: '2026-06-30' },
      { id: 'm9', title: 'Knowledge transfer sessions', completed: false, dueDate: '2026-12-31' }
    ]
  }
];

export default function GoalsPage() {
  const [goals] = useState<Goal[]>(mockGoals);
  const [filter, setFilter] = useState<'all' | 'technical' | 'professional' | 'personal'>('all');

  const getCategoryColor = (category: string) => {
    const colors = {
      technical: 'bg-blue-100 text-blue-700',
      professional: 'bg-purple-100 text-purple-700',
      personal: 'bg-green-100 text-green-700'
    };
    return colors[category as keyof typeof colors];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'on-track': 'bg-green-100 text-green-700',
      'at-risk': 'bg-orange-100 text-orange-700',
      'completed': 'bg-gray-100 text-gray-700'
    };
    return colors[status as keyof typeof colors];
  };

  const filteredGoals = filter === 'all' ? goals : goals.filter(g => g.category === filter);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Goals & Objectives</h1>
          <p className="text-gray-600">
            Track your professional development and career goals
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-blue-100">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Goals</p>
              <p className="text-3xl font-bold">{goals.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">On Track</p>
              <p className="text-3xl font-bold">{goals.filter(g => g.status === 'on-track').length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-purple-100">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Progress</p>
              <p className="text-3xl font-bold">
                {Math.round(goals.reduce((sum, g) => sum + (g.progress / g.target * 100), 0) / goals.length)}%
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-orange-100">
              <Target className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">This Quarter</p>
              <p className="text-3xl font-bold">2</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {(['all', 'technical', 'professional', 'personal'] as const).map((f) => (
          <Button
            key={f}
            variant={filter === f ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {filteredGoals.map((goal) => (
          <Card key={goal.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-xl">{goal.title}</h3>
                  <Badge className={getCategoryColor(goal.category)}>
                    {goal.category}
                  </Badge>
                  <Badge className={getStatusColor(goal.status)}>
                    {goal.status.replace('-', ' ')}
                  </Badge>
                </div>
                <p className="text-gray-600 mb-3">{goal.description}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Due: {goal.dueDate}</span>
                  <span>Priority: {goal.priority.charAt(0).toUpperCase() + goal.priority.slice(1)}</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm font-medium">
                  {goal.progress} / {goal.target} {goal.unit} ({Math.round(goal.progress / goal.target * 100)}%)
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-3 bg-blue-500 rounded-full transition-all"
                  style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                />
              </div>
            </div>

            {/* Milestones */}
            <div className="border-t pt-4">
              <h4 className="font-medium mb-3">Milestones</h4>
              <div className="space-y-2">
                {goal.milestones.map((milestone) => (
                  <div
                    key={milestone.id}
                    className="flex items-center gap-3 p-2 rounded hover:bg-gray-50"
                  >
                    {milestone.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-400" />
                    )}
                    <span className={milestone.completed ? 'line-through text-gray-500' : ''}>
                      {milestone.title}
                    </span>
                    <span className="text-sm text-gray-500 ml-auto">{milestone.dueDate}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4 pt-4 border-t">
              <Button size="sm" variant="outline">Update Progress</Button>
              <Button size="sm" variant="outline">Add Milestone</Button>
              <Button size="sm" variant="outline">View Details</Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Goal Form */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Create New Goal</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label htmlFor="goal-title">Goal Title</Label>
            <Input id="goal-title" placeholder="e.g., Master TypeScript" />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="goal-description">Description</Label>
            <textarea
              id="goal-description"
              className="w-full p-2 border rounded min-h-20"
              placeholder="Describe your goal..."
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <select id="category" className="w-full p-2 border rounded">
              <option>Technical</option>
              <option>Professional</option>
              <option>Personal</option>
            </select>
          </div>
          <div>
            <Label htmlFor="priority">Priority</Label>
            <select id="priority" className="w-full p-2 border rounded">
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          <div>
            <Label htmlFor="target">Target</Label>
            <Input id="target" type="number" placeholder="10" />
          </div>
          <div>
            <Label htmlFor="unit">Unit</Label>
            <Input id="unit" placeholder="e.g., courses, projects" />
          </div>
          <div>
            <Label htmlFor="due-date">Due Date</Label>
            <Input id="due-date" type="date" />
          </div>
        </div>
        <Button className="mt-4">
          <Plus className="h-4 w-4 mr-2" />
          Create Goal
        </Button>
      </Card>
    </div>
  );
}
