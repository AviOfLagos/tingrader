import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TaskCreationWizard from "@/components/tasks/TaskCreationWizard";

interface TaskCreationModalProps {
  open: boolean;
  onClose: () => void;
}

const TaskCreationModal: React.FC<TaskCreationModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
        </DialogHeader>
        <TaskCreationWizard onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default TaskCreationModal;