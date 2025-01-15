// components/tasks/grades/components/export/ExportOptions.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  Download,
  ClipboardCopy,
  Mail,
  FileSpreadsheet,
  Table as TableIcon,
  Share2,
  UserPlus,
  Send,
} from "lucide-react";
import { formatExport } from "./utils/exportFormatters";
import { generateEmailTemplate } from "./utils/emailTemplates";
import { executeBulkAction } from "./utils/bulkActions";
import { UserGradeInfo } from "@/types/task";
import EmailTemplate from "./EmailTemplate";

interface ExportOptionsProps {
  users: UserGradeInfo[];
  taskTitle: string;
  taskId: string;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({
  users,
  taskTitle,
  taskId,
}) => {
  const [showEmailTemplate, setShowEmailTemplate] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<
    "pass" | "fail" | "reminder" | null
  >(null);

  const exportCounts = {
    all: users.length,
    pass: users.filter((u) => u.status === "pass").length,
    fail: users.filter((u) => u.status === "fail").length,
    pending: users.filter((u) => u.status === "pending").length,
  };

  const handleExport = async (
    format: "clipboard" | "csv" | "excel" | "sheets",
    status: "all" | "pass" | "fail" | "pending"
  ) => {
    const filteredUsers = users.filter((user) =>
      status === "all" ? true : user.status === status
    );

    try {
      const result = await formatExport(filteredUsers, format, taskTitle);

      if (format === "clipboard") {
        await navigator.clipboard.writeText(result as string);
        toast.success(
          `Copied ${filteredUsers.length} email${filteredUsers.length !== 1 ? "s" : ""} to clipboard`
        );
      } else if (format === "sheets") {
        window.open(result as string, "_blank");
        toast.success("Opening in Google Sheets...");
      } else {
        // Handle file downloads (CSV, Excel)
        const blob = new Blob([result as BlobPart], {
          type:
            format === "csv"
              ? "text/csv"
              : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${taskTitle}-${status}-users.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast.success(
          `Downloaded ${filteredUsers.length} user${filteredUsers.length !== 1 ? "s" : ""}`
        );
      }
    } catch (error) {
      toast.error("Failed to export data");
    }
  };

  const handleBulkAction = async (
    action: "invite" | "remind" | "share",
    status: "all" | "pass" | "fail" | "pending"
  ) => {
    const filteredUsers = users.filter((user) =>
      status === "all" ? true : user.status === status
    );

    try {
      await executeBulkAction(action, filteredUsers, { taskId });
      toast.success(`Bulk action '${action}' completed successfully`);
    } catch (error) {
      toast.error(`Failed to execute bulk action: ${error}`);
    }
  };

  const handleEmailTemplate = (type: "pass" | "fail" | "reminder") => {
    setSelectedTemplate(type);
    setShowEmailTemplate(true);
  };

  return (
    <div className="flex gap-2">
      {/* Export Data Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Select Export Format</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* Clipboard Export */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <ClipboardCopy className="w-4 h-4 mr-2" />
              Copy to Clipboard
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                onClick={() => handleExport("clipboard", "all")}
              >
                All Users ({exportCounts.all})
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleExport("clipboard", "pass")}
              >
                Passed Users ({exportCounts.pass})
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleExport("clipboard", "fail")}
              >
                Failed Users ({exportCounts.fail})
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleExport("clipboard", "pending")}
              >
                Pending Users ({exportCounts.pending})
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          {/* File Exports */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Download Excel
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => handleExport("excel", "all")}>
                All Users ({exportCounts.all})
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("excel", "pass")}>
                Passed Users ({exportCounts.pass})
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("excel", "fail")}>
                Failed Users ({exportCounts.fail})
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleExport("excel", "pending")}
              >
                Pending Users ({exportCounts.pending})
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          {/* Google Sheets Export */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <TableIcon className="w-4 h-4 mr-2" />
              Open in Sheets
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => handleExport("sheets", "all")}>
                All Users ({exportCounts.all})
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("sheets", "pass")}>
                Passed Users ({exportCounts.pass})
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport("sheets", "fail")}>
                Failed Users ({exportCounts.fail})
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleExport("sheets", "pending")}
              >
                Pending Users ({exportCounts.pending})
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Bulk Actions Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <UserPlus className="w-4 h-4 mr-2" />
            Bulk Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Select Action</DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* Invite Users */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus className="w-4 h-4 mr-2" />
              Invite Users
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                onClick={() => handleBulkAction("invite", "all")}
              >
                All Users ({exportCounts.all})
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleBulkAction("invite", "pending")}
              >
                Pending Users ({exportCounts.pending})
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          {/* Share Results */}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Share2 className="w-4 h-4 mr-2" />
              Share Results
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                onClick={() => handleBulkAction("share", "pass")}
              >
                Share with Passed ({exportCounts.pass})
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleBulkAction("share", "fail")}
              >
                Share with Failed ({exportCounts.fail})
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          {/* Send Reminders */}
          <DropdownMenuItem
            onClick={() => handleBulkAction("remind", "pending")}
          >
            <Send className="w-4 h-4 mr-2" />
            Send Reminders ({exportCounts.pending})
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Email Templates Button */}
      <Dialog open={showEmailTemplate} onOpenChange={setShowEmailTemplate}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Mail className="w-4 h-4 mr-2" />
            Email Templates
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[725px]">
          <DialogHeader>
            <DialogTitle>Email Template</DialogTitle>
            <DialogDescription>
              Generate and customize email templates for different purposes
            </DialogDescription>
          </DialogHeader>
          {selectedTemplate && (
            <EmailTemplate
              type={selectedTemplate}
              taskTitle={taskTitle}
              onClose={() => setShowEmailTemplate(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ExportOptions;
