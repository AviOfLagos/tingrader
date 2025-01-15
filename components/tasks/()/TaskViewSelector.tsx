// components/tasks/TaskViewSelector.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { GridIcon, ListIcon } from 'lucide-react';
import { ViewMode } from '@/types/task';

interface TaskViewSelectorProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

const TaskViewSelector: React.FC<TaskViewSelectorProps> = ({
  currentView,
  onViewChange,
}) => {
  return (
    <div className="flex gap-2">
      <Button
        variant={currentView === 'grid' ? 'default' : 'outline'}
        size="icon"
        onClick={() => onViewChange('grid')}
        className="w-10 h-10"
      >
        <GridIcon className="h-4 w-4" />
      </Button>
      <Button
        variant={currentView === 'list' ? 'default' : 'outline'}
        size="icon"
        onClick={() => onViewChange('list')}
        className="w-10 h-10"
      >
        <ListIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default TaskViewSelector;