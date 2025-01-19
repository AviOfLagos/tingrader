// components/tasks/create/TaskCreationModal.tsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Copy, Mail, Share2, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

interface TaskCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskId: string;
  taskTitle: string;
  isError?: boolean;
  errorMessage?: string;
}

export function TaskCreationModal({
  isOpen,
  onClose,
  taskId,
  taskTitle,
  isError = false,
  errorMessage,
}: TaskCreationModalProps) {
  const router = useRouter();
  const [copied, setCopied] = React.useState(false);
const taskUrl = `${window.location.origin}/app/tasks/${taskId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(taskUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`New Task: ${taskTitle}`);
    const body = encodeURIComponent(`Check out this task: ${taskUrl}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

    const handleViewTask = () => {
      router.push(`/app/tasks/${taskId}`);
      onClose();
    };

  if (isError) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-destructive">
              Error Creating Task
            </DialogTitle>
            <DialogDescription>
              {errorMessage ||
                "There was an error creating the task. Please try again."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <Check className="h-6 w-6 text-green-500" />
              Task Created Successfully!
            </div>
          </DialogTitle>
          <DialogDescription>
            Your task "{taskTitle}" has been created. Share it with your team or
            view it now.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Task Link</Label>
            <div className="flex gap-2">
              <Input value={taskUrl} readOnly />
              <Button variant="outline" onClick={handleCopyLink}>
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              className="flex-1"
              variant="outline"
              onClick={handleEmailShare}
            >
              <Mail className="h-4 w-4 mr-2" />
              Share via Email
            </Button>
            <Button
              className="flex-1"
              variant="outline"
              onClick={handleCopyLink}
            >
              <Share2 className="h-4 w-4 mr-2" />
              Copy Link
            </Button>
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <Button
            variant="outline"
            onClick={() => {
              onClose();
              router.push("/tasks/create");
            }}
          >
            Create Another
          </Button>
          <Button onClick={handleViewTask}>
            <ExternalLink className="h-4 w-4 mr-2" />
            View Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
