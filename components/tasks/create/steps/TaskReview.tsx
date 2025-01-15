// "use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { CalendarClock, Users, Star, Link as LinkIcon } from 'lucide-react';

interface TaskData {
  title?: string;
  description?: string;
  track?: string;
  stage?: string;
  requirements?: string;
  resources?: string[];
  gradingType?: 'stars' | 'swipe';
  passingScore?: number;
  dueDate?: string;
  assignedGraders?: string[];
}

interface TaskReviewProps {
  data: TaskData;
}

export default function TaskReview({ data }: TaskReviewProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-6">
      {/* Task Overview */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-2">
          {data.title || 'Untitled Task'}
        </h3>
        <p className="text-muted-foreground mb-4">
          {data.description || 'No description provided'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center text-sm">
            <div className="w-24 text-muted-foreground">Track:</div>
            <div className="font-medium">{data.track || 'Not specified'}</div>
          </div>
          <div className="flex items-center text-sm">
            <div className="w-24 text-muted-foreground">Stage:</div>
            <div className="font-medium">{data.stage || 'Not specified'}</div>
          </div>
        </div>
      </Card>

      {/* Requirements & Resources */}
      <Card className="p-6">
        <h4 className="font-semibold mb-3">Requirements</h4>
        <p className="text-sm whitespace-pre-wrap mb-4">
          {data.requirements || 'No requirements specified'}
        </p>

        {data.resources && data.resources.length > 0 && (
          <>
            <h4 className="font-semibold mb-2">Resources</h4>
            <ul className="space-y-2">
              {data.resources.map((resource, index) => (
                <li key={index} className="flex items-center text-sm">
                  <LinkIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{resource}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </Card>

      {/* Grading Settings */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center">
            <Star className="h-5 w-5 mr-3 text-muted-foreground" />
            <div>
              <h4 className="font-medium">Grading Method</h4>
              <p className="text-sm text-muted-foreground">
                {data.gradingType === 'stars'
                  ? `Star Rating (${data.passingScore} stars to pass)`
                  : 'Swipe Grading (Pass/Fail)'}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <CalendarClock className="h-5 w-5 mr-3 text-muted-foreground" />
            <div>
              <h4 className="font-medium">Due Date</h4>
              <p className="text-sm text-muted-foreground">
                {data.dueDate ? formatDate(data.dueDate) : 'No deadline set'}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <Users className="h-5 w-5 mr-3 text-muted-foreground" />
            <div>
              <h4 className="font-medium">Assigned Graders</h4>
              <p className="text-sm text-muted-foreground">
                {data.assignedGraders && data.assignedGraders.length > 0
                  ? data.assignedGraders.join(', ')
                  : 'No graders assigned'}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
