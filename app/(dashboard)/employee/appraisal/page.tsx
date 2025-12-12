'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface Appraisal {
  id: string;
  period: string;
  year: number;
  status: 'draft' | 'submitted' | 'under-review' | 'completed';
  selfRating: number;
  managerRating?: number;
  submittedDate?: string;
  reviewDate?: string;
}

const mockAppraisals: Appraisal[] = [
  {
    id: '1',
    period: 'H2',
    year: 2025,
    status: 'draft',
    selfRating: 0,
    submittedDate: undefined
  },
  {
    id: '2',
    period: 'H1',
    year: 2025,
    status: 'completed',
    selfRating: 4.5,
    managerRating: 4.7,
    submittedDate: '2025-06-15',
    reviewDate: '2025-07-01'
  },
  {
    id: '3',
    period: 'H2',
    year: 2024,
    status: 'completed',
    selfRating: 4.2,
    managerRating: 4.5,
    submittedDate: '2024-12-15',
    reviewDate: '2025-01-05'
  }
];

export default function AppraisalPage() {
  const [appraisals] = useState<Appraisal[]>(mockAppraisals);

  const getStatusBadge = (status: string) => {
    const config = {
      draft: { variant: 'secondary' as const, label: 'Draft', icon: FileText },
      submitted: { variant: 'default' as const, label: 'Submitted', icon: Clock },
      'under-review': { variant: 'default' as const, label: 'Under Review', icon: AlertCircle },
      completed: { variant: 'default' as const, label: 'Completed', icon: CheckCircle }
    };
    return config[status as keyof typeof config] || config.draft;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Performance Appraisals</h1>
          <p className="text-gray-600">
            Manage your performance reviews and development plans
          </p>
        </div>
        <Button>Start New Appraisal</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-blue-100">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Reviews</p>
              <p className="text-3xl font-bold">{appraisals.length}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-orange-100">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-3xl font-bold">
                {appraisals.filter(a => a.status === 'draft' || a.status === 'submitted').length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-3xl font-bold">
                {appraisals.filter(a => a.status === 'completed').length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-purple-100">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Rating</p>
              <p className="text-3xl font-bold">4.6</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Current Appraisal */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-xl">Current Appraisal - H2 2025</h3>
          <Badge variant="secondary">Draft</Badge>
        </div>

        <div className="space-y-6">
          {/* Self-Assessment */}
          <div>
            <h4 className="font-semibold mb-4">Self-Assessment</h4>
            <div className="space-y-4">
              <div>
                <Label>Key Achievements</Label>
                <textarea
                  className="w-full p-3 border rounded min-h-32 mt-2"
                  placeholder="Describe your key achievements during this period..."
                />
              </div>
              <div>
                <Label>Challenges Faced</Label>
                <textarea
                  className="w-full p-3 border rounded min-h-32 mt-2"
                  placeholder="What challenges did you encounter and how did you address them?"
                />
              </div>
              <div>
                <Label>Areas for Development</Label>
                <textarea
                  className="w-full p-3 border rounded min-h-32 mt-2"
                  placeholder="What areas would you like to improve or develop?"
                />
              </div>
              <div>
                <Label>Career Goals</Label>
                <textarea
                  className="w-full p-3 border rounded min-h-32 mt-2"
                  placeholder="What are your short-term and long-term career goals?"
                />
              </div>
            </div>
          </div>

          {/* Competencies Rating */}
          <div>
            <h4 className="font-semibold mb-4">Competencies Self-Rating</h4>
            <div className="space-y-3">
              {[
                'Technical Skills',
                'Communication',
                'Problem Solving',
                'Teamwork',
                'Initiative',
                'Time Management'
              ].map((competency) => (
                <div key={competency} className="flex items-center justify-between p-3 border rounded">
                  <span>{competency}</span>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        className="w-10 h-10 rounded border hover:bg-blue-100 hover:border-blue-300 transition-colors"
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Overall Rating */}
          <div>
            <Label>Overall Self-Rating</Label>
            <div className="flex items-center gap-4 mt-2">
              <select className="p-2 border rounded">
                <option>Select rating...</option>
                <option>5 - Outstanding</option>
                <option>4 - Exceeds Expectations</option>
                <option>3 - Meets Expectations</option>
                <option>2 - Needs Improvement</option>
                <option>1 - Unsatisfactory</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <Button>Save Draft</Button>
            <Button variant="outline">Submit for Review</Button>
            <Button variant="ghost">Cancel</Button>
          </div>
        </div>
      </Card>

      {/* Past Appraisals */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Past Appraisals</h3>
        <div className="space-y-3">
          {appraisals.filter(a => a.status === 'completed').map((appraisal) => {
            const StatusIcon = getStatusBadge(appraisal.status).icon;
            return (
              <div
                key={appraisal.id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold">
                        {appraisal.period} {appraisal.year}
                      </h4>
                      <Badge variant={getStatusBadge(appraisal.status).variant}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {getStatusBadge(appraisal.status).label}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Self Rating:</span> {appraisal.selfRating}/5
                      </div>
                      {appraisal.managerRating && (
                        <div>
                          <span className="font-medium">Manager Rating:</span> {appraisal.managerRating}/5
                        </div>
                      )}
                      {appraisal.submittedDate && (
                        <div>
                          <span className="font-medium">Submitted:</span> {appraisal.submittedDate}
                        </div>
                      )}
                      {appraisal.reviewDate && (
                        <div>
                          <span className="font-medium">Reviewed:</span> {appraisal.reviewDate}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Manager Feedback */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Latest Manager Feedback</h3>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="font-medium mb-2">Strengths</p>
            <p className="text-sm text-gray-700">
              Demonstrates excellent technical skills and consistently delivers high-quality work. 
              Shows strong initiative in taking on challenging projects and mentoring junior team members.
            </p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <p className="font-medium mb-2">Areas for Development</p>
            <p className="text-sm text-gray-700">
              Could benefit from improving cross-team communication and participating more actively 
              in architectural discussions. Consider taking on more leadership opportunities.
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="font-medium mb-2">Development Plan</p>
            <ul className="text-sm text-gray-700 list-disc list-inside space-y-1">
              <li>Complete advanced communication skills workshop</li>
              <li>Lead at least one cross-functional project</li>
              <li>Present technical topics in monthly team meetings</li>
              <li>Shadow senior architect for system design reviews</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
