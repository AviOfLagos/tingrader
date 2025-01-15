// components/tasks/TaskQuickActions.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Pencil,
  Trash2,
  Share2,
  Copy,
  MoreVertical,
  ClipboardEdit,
  CheckSquare,
  Eye,
} from 'lucide-react';
import { Task } from '@/types/task';

interface TaskQuickActionsProps {
  task: Task;
  view: 'grid' | 'list';
  onAction: (action: string, taskId: string) => void;
}

const TaskQuickActions: React.FC<TaskQuickActionsProps> = ({
  task,
  view,
  onAction,
}) => {
  const handleAction = (action: string) => {
    onAction(action, task.id);
  };

  const getPrimaryAction = () => {
    if (task.permissions.canSubmit && !task.submissions.userHasSubmitted) {
      return {
        label: 'Submit',
        icon: ClipboardEdit,
        action: 'submit',
      };
    }
    if (task.permissions.canGrade && !task.grading.userHasGraded) {
      return {
        label: 'Grade',
        icon: CheckSquare,
        action: 'grade',
      };
    }
    return {
      label: 'View',
      icon: Eye,
      action: 'view',
    };
  };

  const primaryAction = getPrimaryAction();

  return (
    <div className="flex items-center gap-2">
      {/* Primary Action Button */}
      <Button
        variant="default"
        size={view === 'grid' ? 'sm' : 'default'}
        onClick={() => handleAction(primaryAction.action)}
        className="gap-2"
      >
        <primaryAction.icon className="h-4 w-4" />
        {view === 'list' && primaryAction.label}
      </Button>

      {/* Secondary Actions Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size={view === 'grid' ? 'sm' : 'default'}
            className="px-2"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {primaryAction.action !== 'submit' && task.permissions.canSubmit && (
            <DropdownMenuItem onClick={() => handleAction('submit')}>
              <ClipboardEdit className="h-4 w-4 mr-2" />
              Submit
            </DropdownMenuItem>
          )}
          {primaryAction.action !== 'grade' && task.permissions.canGrade && (
            <DropdownMenuItem onClick={() => handleAction('grade')}>
              <CheckSquare className="h-4 w-4 mr-2" />
              Grade
            </DropdownMenuItem>
          )}
          {primaryAction.action !== 'view' && (
            <DropdownMenuItem onClick={() => handleAction('view')}>
              <Eye className="h-4 w-4 mr-2" />
              View
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          {task.permissions.canEdit && (
            <DropdownMenuItem onClick={() => handleAction('edit')}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
          )}
          {task.permissions.canDelete && (
            <DropdownMenuItem
              onClick={() => handleAction('delete')}
              className="text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => handleAction('share')}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleAction('duplicate')}>
            <Copy className="h-4 w-4 mr-2" />
            Duplicate
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TaskQuickActions;
