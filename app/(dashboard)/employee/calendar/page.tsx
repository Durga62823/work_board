'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  type: 'task' | 'meeting' | 'deadline' | 'milestone';
  date: string;
  time?: string;
  priority?: 'low' | 'medium' | 'high';
}

const mockEvents: CalendarEvent[] = [
  { id: '1', title: 'Team Standup', type: 'meeting', date: '2025-12-09', time: '09:00 AM' },
  { id: '2', title: 'Code Review Session', type: 'meeting', date: '2025-12-09', time: '02:00 PM' },
  { id: '3', title: 'Update Dashboard UI', type: 'task', date: '2025-12-09', priority: 'high' },
  { id: '4', title: 'Sprint Planning', type: 'meeting', date: '2025-12-10', time: '10:00 AM' },
  { id: '5', title: 'API Integration Due', type: 'deadline', date: '2025-12-12', priority: 'high' },
  { id: '6', title: 'Sprint 23 Ends', type: 'milestone', date: '2025-12-13' },
  { id: '7', title: 'Performance Review', type: 'meeting', date: '2025-12-15', time: '03:00 PM' }
];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 9)); // Dec 9, 2025
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const getEventsForDate = (date: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
    return mockEvents.filter(e => e.date === dateStr);
  };

  const getEventColor = (type: string) => {
    const colors = {
      task: 'bg-blue-100 text-blue-700 border-blue-200',
      meeting: 'bg-purple-100 text-purple-700 border-purple-200',
      deadline: 'bg-red-100 text-red-700 border-red-200',
      milestone: 'bg-green-100 text-green-700 border-green-200'
    };
    return colors[type as keyof typeof colors];
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isToday = (date: number) => {
    const today = new Date();
    return date === today.getDate() && 
           currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Calendar</h1>
          <p className="text-gray-600">
            View your tasks, meetings, and deadlines
          </p>
        </div>
        <div className="flex gap-2">
          {(['month', 'week', 'day'] as const).map((v) => (
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
      </div>

      {/* Calendar Controls */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <Button variant="outline" size="sm" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <Button variant="outline" size="sm" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {/* Day Headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center font-semibold text-sm text-gray-600 py-2">
              {day}
            </div>
          ))}

          {/* Empty cells for days before month starts */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="min-h-24 p-2 bg-gray-50 rounded" />
          ))}

          {/* Calendar days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const date = i + 1;
            const events = getEventsForDate(date);
            const today = isToday(date);

            return (
              <div
                key={date}
                className={`min-h-24 p-2 border rounded hover:shadow-md transition-shadow ${
                  today ? 'bg-blue-50 border-blue-300' : 'bg-white'
                }`}
              >
                <div className={`text-sm font-medium mb-1 ${today ? 'text-blue-600' : ''}`}>
                  {date}
                </div>
                <div className="space-y-1">
                  {events.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 rounded border ${getEventColor(event.type)}`}
                    >
                      {event.time && <div className="font-medium">{event.time}</div>}
                      <div className="truncate">{event.title}</div>
                    </div>
                  ))}
                  {events.length > 2 && (
                    <div className="text-xs text-gray-500">+{events.length - 2} more</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Upcoming Events */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Upcoming Events</h3>
        <div className="space-y-3">
          {mockEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-center gap-4 p-3 border rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="p-2 rounded bg-gray-100">
                <CalendarIcon className="h-5 w-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium">{event.title}</h4>
                  <Badge className={getEventColor(event.type)}>
                    {event.type}
                  </Badge>
                  {event.priority && (
                    <Badge variant={event.priority === 'high' ? 'destructive' : 'secondary'}>
                      {event.priority}
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  {event.date} {event.time && `• ${event.time}`}
                </div>
              </div>
              <Button size="sm" variant="outline">View</Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Legend */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Event Types</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { type: 'task', label: 'Tasks', icon: '📋' },
            { type: 'meeting', label: 'Meetings', icon: '👥' },
            { type: 'deadline', label: 'Deadlines', icon: '⏰' },
            { type: 'milestone', label: 'Milestones', icon: '🎯' }
          ].map((item) => (
            <div key={item.type} className="flex items-center gap-3">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <div className={`text-xs px-2 py-1 rounded border inline-block ${getEventColor(item.type)}`}>
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
