'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Plus, Save } from 'lucide-react';

interface TimeEntry {
  id: string;
  date: string;
  project: string;
  task: string;
  hours: number;
  description: string;
  status: 'draft' | 'submitted' | 'approved';
}

const mockEntries: TimeEntry[] = [
  {
    id: '1',
    date: '2025-12-09',
    project: 'Project Alpha',
    task: 'Update UI',
    hours: 4,
    description: 'Worked on dashboard redesign',
    status: 'draft'
  },
  {
    id: '2',
    date: '2025-12-08',
    project: 'Project Beta',
    task: 'Bug Fix',
    hours: 6,
    description: 'Fixed payment module bug',
    status: 'submitted'
  },
  {
    id: '3',
    date: '2025-12-07',
    project: 'Project Alpha',
    task: 'Code Review',
    hours: 2,
    description: 'Reviewed PR #123',
    status: 'approved'
  }
];

export default function TimesheetPage() {
  const [view, setView] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [entries, setEntries] = useState<TimeEntry[]>(mockEntries);

  const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0);
  const billableHours = entries.filter(e => e.project !== 'Internal').reduce((sum, e) => sum + e.hours, 0);

  const getStatusBadge = (status: string) => {
    const config = {
      draft: { variant: 'secondary' as const, label: 'Draft' },
      submitted: { variant: 'default' as const, label: 'Submitted' },
      approved: { variant: 'default' as const, label: 'Approved' }
    };
    return config[status as keyof typeof config] || config.draft;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Timesheet</h1>
          <p className="text-gray-600">
            Log and track your work hours
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            This Week
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Entry
          </Button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2">
        {(['daily', 'weekly', 'monthly'] as const).map((v) => (
          <Button
            key={v}
            variant={view === v ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView(v)}
          >
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </Button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-blue-100">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Hours</p>
              <p className="text-3xl font-bold">{totalHours}h</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-green-100">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Billable Hours</p>
              <p className="text-3xl font-bold">{billableHours}h</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-orange-100">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Non-Billable</p>
              <p className="text-3xl font-bold">{totalHours - billableHours}h</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Entry Form */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Quick Time Entry</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="date">Date</Label>
            <Input type="date" id="date" defaultValue="2025-12-09" />
          </div>
          <div>
            <Label htmlFor="hours">Hours</Label>
            <Input type="number" id="hours" placeholder="8" />
          </div>
          <div>
            <Label htmlFor="project">Project</Label>
            <select id="project" className="w-full p-2 border rounded">
              <option>Project Alpha</option>
              <option>Project Beta</option>
              <option>Project Gamma</option>
            </select>
          </div>
          <div>
            <Label htmlFor="task">Task</Label>
            <Input id="task" placeholder="Task name" />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              className="w-full p-2 border rounded min-h-20"
              placeholder="What did you work on?"
            />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Entry
          </Button>
          <Button variant="outline">Start Timer</Button>
        </div>
      </Card>

      {/* Time Entries List */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Recent Entries</h3>
        <div className="space-y-3">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="p-4 border rounded-lg flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-medium">{entry.date}</span>
                  <Badge variant="outline">{entry.project}</Badge>
                  <span className="text-gray-600">{entry.task}</span>
                </div>
                <p className="text-sm text-gray-600">{entry.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-semibold text-lg">{entry.hours}h</p>
                  <Badge variant={getStatusBadge(entry.status).variant}>
                    {getStatusBadge(entry.status).label}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost">Edit</Button>
                  <Button size="sm" variant="ghost">Delete</Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {entries.filter(e => e.status === 'draft').length} entries pending submission
          </p>
          <Button>Submit Timesheet</Button>
        </div>
      </Card>
    </div>
  );
}
