'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Filter,
  Search,
  Plus
} from 'lucide-react';

type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done';
type FilterType = 'all' | 'today' | 'week' | 'overdue' | 'blocked';

interface Task {
  id: string;
  title: string;
  project: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  estimatedHours: number;
  loggedHours: number;
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Update user dashboard UI',
    project: 'Project Alpha',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2025-12-09',
    estimatedHours: 8,
    loggedHours: 4
  },
  {
    id: '2',
    title: 'Code review for PR #123',
    project: 'Project Beta',
    status: 'todo',
    priority: 'medium',
    dueDate: '2025-12-09',
    estimatedHours: 2,
    loggedHours: 0
  },
  {
    id: '3',
    title: 'Fix critical bug in payment module',
    project: 'Project Gamma',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2025-12-08',
    estimatedHours: 4,
    loggedHours: 6
  },
  {
    id: '4',
    title: 'Write unit tests for authentication',
    project: 'Project Alpha',
    status: 'todo',
    priority: 'medium',
    dueDate: '2025-12-12',
    estimatedHours: 6,
    loggedHours: 0
  },
  {
    id: '5',
    title: 'Update API documentation',
    project: 'Project Beta',
    status: 'review',
    priority: 'low',
    dueDate: '2025-12-15',
    estimatedHours: 3,
    loggedHours: 3
  }
];

export default function MyWorkPage() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusBadge = (status: TaskStatus) => {
    const statusConfig = {
      'todo': { label: 'To Do', variant: 'secondary' as const },
      'in-progress': { label: 'In Progress', variant: 'default' as const },
      'review': { label: 'Review', variant: 'outline' as const },
      'done': { label: 'Done', variant: 'default' as const }
    };
    return statusConfig[status];
  };

  const getPriorityBadge = (priority: 'low' | 'medium' | 'high') => {
    const priorityConfig = {
      low: { label: 'Low', className: 'bg-gray-100 text-gray-700' },
      medium: { label: 'Medium', className: 'bg-orange-100 text-orange-700' },
      high: { label: 'High', className: 'bg-red-100 text-red-700' }
    };
    return priorityConfig[priority];
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Tasks</h1>
          <p className="text-gray-600">
            Manage your assigned tasks and track progress
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Subtask
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'today', 'week', 'overdue', 'blocked'] as FilterType[]).map((f) => (
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
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-blue-100">
              <CheckCircle className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold">2</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gray-100">
              <Clock className="h-5 w-5 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">To Do</p>
              <p className="text-2xl font-bold">2</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-red-100">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Overdue</p>
              <p className="text-2xl font-bold">1</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-green-100">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">In Review</p>
              <p className="text-2xl font-bold">1</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tasks List */}
      <Card className="p-6">
        <div className="space-y-4">
          {mockTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">{task.title}</h3>
                    {isOverdue(task.dueDate) && (
                      <Badge variant="destructive" className="text-xs">
                        Overdue
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{task.project}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Due: {task.dueDate}</span>
                    <span>
                      Time: {task.loggedHours}h / {task.estimatedHours}h
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Badge variant={getStatusBadge(task.status).variant}>
                    {getStatusBadge(task.status).label}
                  </Badge>
                  <Badge className={getPriorityBadge(task.priority).className}>
                    {getPriorityBadge(task.priority).label}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-3 border-t">
                <Button size="sm" variant="outline">
                  View Details
                </Button>
                <Button size="sm" variant="outline">
                  Log Time
                </Button>
                <Button size="sm" variant="outline">
                  Add Comment
                </Button>
                <select className="px-3 py-1 border rounded text-sm">
                  <option>Change Status</option>
                  <option>To Do</option>
                  <option>In Progress</option>
                  <option>Review</option>
                  <option>Done</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
