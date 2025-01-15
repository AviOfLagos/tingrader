// components/tasks/grades/components/export/EmailTemplate.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ClipboardCopy, Send } from "lucide-react";
import { toast } from "sonner";

interface EmailTemplateProps {
  type: "pass" | "fail" | "reminder";
  taskTitle: string;
  onClose: () => void;
}

interface TemplateVariable {
  key: string;
  description: string;
  example: string;
}

const TEMPLATE_VARIABLES: TemplateVariable[] = [
  { key: "{userName}", description: "User's name", example: "John Doe" },
  {
    key: "{taskTitle}",
    description: "Task title",
    example: "Build a REST API",
  },
  { key: "{grade}", description: "User's grade", example: "5/7" },
  { key: "{dueDate}", description: "Task due date", example: "Jan 15, 2025" },
  {
    key: "{feedback}",
    description: "Grader's feedback",
    example: "Great work!",
  },
];

const DEFAULT_TEMPLATES = {
  pass: {
    subject: "Congratulations! You passed {taskTitle}",
    body: `Dear {userName},

Congratulations! You have successfully passed {taskTitle} with a grade of {grade}.

Grader's Feedback:
{feedback}

Keep up the great work!

Best regards,
The Tingrader Team`,
  },
  fail: {
    subject: "Feedback for {taskTitle}",
    body: `Dear {userName},

Thank you for your submission for {taskTitle}. Unfortunately, your submission did not meet all the requirements.

Your grade: {grade}

Grader's Feedback:
{feedback}

Please review the feedback and consider resubmitting your work.

Best regards,
The Tingrader Team`,
  },
  reminder: {
    subject: "Reminder: {taskTitle} Due Soon",
    body: `Dear {userName},

This is a friendly reminder that {taskTitle} is due on {dueDate}.

Don't forget to submit your work before the deadline.

Best regards,
The Tingrader Team`,
  },
};

const EmailTemplate: React.FC<EmailTemplateProps> = ({
  type,
  taskTitle,
  onClose,
}) => {
  const [subject, setSubject] = useState(DEFAULT_TEMPLATES[type].subject);
  const [body, setBody] = useState(DEFAULT_TEMPLATES[type].body);
  const [selectedVariable, setSelectedVariable] = useState<string>("");

  const insertVariable = () => {
    if (!selectedVariable) return;

    const textArea = document.getElementById(
      "emailBody"
    ) as HTMLTextAreaElement;
    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;

    const newBody =
      body.substring(0, start) + selectedVariable + body.substring(end);

    setBody(newBody);
    setSelectedVariable("");
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
      toast.success("Email template copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const previewEmail = () => {
    // Replace variables with example values
    let previewSubject = subject;
    let previewBody = body;

    TEMPLATE_VARIABLES.forEach((variable) => {
      const regex = new RegExp(variable.key, "g");
      previewSubject = previewSubject.replace(regex, variable.example);
      previewBody = previewBody.replace(regex, variable.example);
    });

    return { previewSubject, previewBody };
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <FormItem>
          <FormLabel>Subject</FormLabel>
          <FormControl>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Email subject"
            />
          </FormControl>
        </FormItem>

        <FormItem>
          <FormLabel>Body</FormLabel>
          <div className="flex gap-2 mb-2">
            <Select
              value={selectedVariable}
              onValueChange={setSelectedVariable}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Insert variable" />
              </SelectTrigger>
              <SelectContent>
                {TEMPLATE_VARIABLES.map((variable) => (
                  <SelectItem key={variable.key} value={variable.key}>
                    {variable.key}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              type="button"
              variant="outline"
              onClick={insertVariable}
              disabled={!selectedVariable}
            >
              Insert
            </Button>
          </div>
          <FormControl>
            <Textarea
              id="emailBody"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Email body"
              rows={10}
            />
          </FormControl>
        </FormItem>
      </div>

      <FormDescription>
        Available variables:
        <ul className="mt-2 space-y-1">
          {TEMPLATE_VARIABLES.map((variable) => (
            <li key={variable.key}>
              <code className="text-sm">{variable.key}</code> -{" "}
              {variable.description}
            </li>
          ))}
        </ul>
      </FormDescription>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={copyToClipboard}>
          <ClipboardCopy className="w-4 h-4 mr-2" />
          Copy Template
        </Button>
        <Button type="button" onClick={onClose}>
          <Send className="w-4 h-4 mr-2" />
          Done
        </Button>
      </div>
    </div>
  );
};

export default EmailTemplate;
