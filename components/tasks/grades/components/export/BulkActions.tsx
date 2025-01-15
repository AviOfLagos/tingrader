// components/tasks/grades/components/export/BulkAction.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserGradeInfo } from "@/types/task";
import { AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  executeBulkAction,
  prepareBulkAction,
  BulkAction as BulkActionType,
} from "./utils/bulkActions";

interface BulkActionProps {
  action: BulkActionType;
  users: UserGradeInfo[];
  taskId: string;
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

const ACTION_LABELS = {
  invite: "Invite Users",
  remind: "Send Reminders",
  share: "Share Results",
};

const BulkAction: React.FC<BulkActionProps> = ({
  action,
  users,
  taskId,
  isOpen,
  onClose,
  onComplete,
}) => {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  const { validUsers, invalidUsers } = prepareBulkAction(action, users);

  const handleExecute = async () => {
    if (!validUsers.length) {
      setError("No valid users for this action");
      return;
    }

    setProcessing(true);
    setError(null);
    setProgress(0);

    try {
      // Execute bulk action with progress tracking
      await executeBulkAction(action, validUsers, {
        taskId,
        onProgress: (current: number, total: number) => {
          setProgress((current / total) * 100);
        },
      });

      setCompleted(true);
      toast.success(`${ACTION_LABELS[action]} completed successfully`);
      onComplete?.();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      toast.error(`Failed to ${action}: ${errorMessage}`);
    } finally {
      setProcessing(false);
    }
  };

  const handleClose = () => {
    if (!processing) {
      setError(null);
      setProgress(0);
      setCompleted(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{ACTION_LABELS[action]}</DialogTitle>
          <DialogDescription>
            {completed
              ? `Successfully processed ${validUsers.length} users`
              : `This will ${action} ${validUsers.length} users`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Progress Indicator */}
          {processing && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground text-center">
                Processing... {Math.round(progress)}%
              </p>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Invalid Users Warning */}
          {invalidUsers.length > 0 && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                {invalidUsers.length} users cannot be processed:
                <ScrollArea className="h-20 mt-2">
                  <ul className="text-sm">
                    {invalidUsers.map((user) => (
                      <li key={user.userId} className="text-muted-foreground">
                        {user.email} - Not eligible for this action
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </AlertDescription>
            </Alert>
          )}

          {/* Success Message */}
          {completed && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Successfully processed {validUsers.length} users
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={processing}
          >
            {completed ? "Close" : "Cancel"}
          </Button>
          {!completed && (
            <Button
              onClick={handleExecute}
              disabled={processing || validUsers.length === 0}
            >
              {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {processing
                ? "Processing..."
                : `Process ${validUsers.length} Users`}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkAction;
