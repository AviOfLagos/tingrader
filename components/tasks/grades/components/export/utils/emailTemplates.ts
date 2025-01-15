// components/tasks/grades/components/export/utils/emailTemplates.ts
interface EmailVariables {
  userName: string;
  taskTitle: string;
  grade?: string | number;
  dueDate?: string;
  feedback?: string;
  submissionUrl?: string;
  gradingUrl?: string;
  platformName?: string;
}

type TemplateType =
  | "pass"
  | "fail"
  | "reminder"
  | "invite"
  | "grading-complete";

interface EmailTemplate {
  subject: string;
  body: string;
  variables: (keyof EmailVariables)[];
  requiredVariables: (keyof EmailVariables)[];
}

export const EMAIL_TEMPLATES: Record<TemplateType, EmailTemplate> = {
  pass: {
    subject: "✨ Congratulations! You passed {taskTitle}",
    body: `Dear {userName},

Great job! You have successfully passed {taskTitle} with a grade of {grade}.

Grader's Feedback:
{feedback}

You can view your detailed results here: {submissionUrl}

Keep up the excellent work!

Best regards,
The {platformName} Team`,
    variables: [
      "userName",
      "taskTitle",
      "grade",
      "feedback",
      "submissionUrl",
      "platformName",
    ],
    requiredVariables: ["userName", "taskTitle", "grade"],
  },
  fail: {
    subject: "Feedback for {taskTitle} Submission",
    body: `Dear {userName},

Thank you for your submission for {taskTitle}. 

Your current grade: {grade}

Grader's Feedback:
{feedback}

We encourage you to review the feedback and consider resubmitting your work. You can view your submission and make improvements here: {submissionUrl}

Don't hesitate to reach out if you need any clarification.

Best regards,
The {platformName} Team`,
    variables: [
      "userName",
      "taskTitle",
      "grade",
      "feedback",
      "submissionUrl",
      "platformName",
    ],
    requiredVariables: ["userName", "taskTitle", "grade", "feedback"],
  },
  reminder: {
    subject: "⏰ Reminder: {taskTitle} Due Soon",
    body: `Dear {userName},

This is a friendly reminder that {taskTitle} is due on {dueDate}.

Quick Links:
- Submit your work: {submissionUrl}
- View task details: {gradingUrl}

Don't forget to submit your work before the deadline!

Best regards,
The {platformName} Team`,
    variables: [
      "userName",
      "taskTitle",
      "dueDate",
      "submissionUrl",
      "gradingUrl",
      "platformName",
    ],
    requiredVariables: ["userName", "taskTitle", "dueDate"],
  },
  invite: {
    subject: "You're Invited to Grade {taskTitle}",
    body: `Dear {userName},

You have been selected as a grader for {taskTitle}.

You can start grading submissions here: {gradingUrl}

Task Details:
- Due Date: {dueDate}
- Your Role: Grader

Thank you for your participation in the grading process.

Best regards,
The {platformName} Team`,
    variables: [
      "userName",
      "taskTitle",
      "dueDate",
      "gradingUrl",
      "platformName",
    ],
    requiredVariables: ["userName", "taskTitle", "gradingUrl"],
  },
  "grading-complete": {
    subject: "Grading Complete for {taskTitle}",
    body: `Dear {userName},

The grading process for {taskTitle} has been completed.

Summary:
- Task: {taskTitle}
- Your Grade: {grade}
- Detailed Feedback: {feedback}

You can view your complete results here: {submissionUrl}

Best regards,
The {platformName} Team`,
    variables: [
      "userName",
      "taskTitle",
      "grade",
      "feedback",
      "submissionUrl",
      "platformName",
    ],
    requiredVariables: ["userName", "taskTitle", "grade"],
  },
};

interface GenerateEmailOptions {
  template: TemplateType;
  variables: Partial<EmailVariables>;
  customizations?: {
    subject?: string;
    body?: string;
  };
}

export const generateEmailTemplate = ({
  template,
  variables,
  customizations,
}: GenerateEmailOptions): { subject: string; body: string } | null => {
  const templateConfig = EMAIL_TEMPLATES[template];
  if (!templateConfig) {
    throw new Error(`Unknown email template: ${template}`);
  }

  // Validate required variables
  const missingVariables = templateConfig.requiredVariables.filter(
    (varName) => !variables[varName]
  );

  if (missingVariables.length > 0) {
    throw new Error(
      `Missing required variables for ${template} template: ${missingVariables.join(", ")}`
    );
  }

  // Provide default platform name if not specified
  const allVariables = {
    platformName: "Tingrader",
    ...variables,
  };

  // Replace variables in subject and body
  let subject = customizations?.subject || templateConfig.subject;
  let body = customizations?.body || templateConfig.body;

  // Replace all variables
  Object.entries(allVariables).forEach(([key, value]) => {
    const regex = new RegExp(`{${key}}`, "g");
    subject = subject.replace(regex, value?.toString() || "");
    body = body.replace(regex, value?.toString() || "");
  });

  return { subject, body };
};

export const validateEmailTemplate = (
  template: TemplateType,
  variables: Partial<EmailVariables>
): { isValid: boolean; missingVariables: string[] } => {
  const templateConfig = EMAIL_TEMPLATES[template];
  if (!templateConfig) {
    return { isValid: false, missingVariables: ["Invalid template type"] };
  }

  const missingVariables = templateConfig.requiredVariables.filter(
    (varName) => !variables[varName]
  );

  return {
    isValid: missingVariables.length === 0,
    missingVariables,
  };
};

export type { EmailVariables, TemplateType };
