// components/tasks/grades/components/export/utils/bulkActions.ts
import { UserGradeInfo } from '@/types/task';

type BulkAction = 'invite' | 'remind' | 'share';

interface InviteData {
  taskId: string;
  emails: string[];
  template: string;
}

interface RemindData {
  taskId: string;
  users: { email: string; userId: string }[];
  type: string;
}

interface ShareData {
  taskId: string;
  results: { email: string; userId: string; grade: number; status: string }[];
}

type BulkActionData = InviteData | RemindData | ShareData;

interface ActionConfig {
  endpoint: string;
  method: string;
  prepareData: (
    users: UserGradeInfo[],
    taskId: string
  ) => BulkActionData;
  successMessage: string;
  validateUsers?: (users: UserGradeInfo[]) => boolean;
  rateLimitPerMinute?: number;
}

const ACTION_CONFIGS: Record<BulkAction, ActionConfig> = {
  invite: {
    endpoint: '/api/users/invite',
    method: 'POST',
    prepareData: (users, taskId) => ({
      taskId,
      emails: users.map((user) => user.email),
      template: 'task_invitation',
    }),
    successMessage: 'Invitations sent successfully',
    validateUsers: (users) =>
      users.every((user) => user.email && user.status === 'pending'),
    rateLimitPerMinute: 100, // Limit invites to 100 per minute
  },
  remind: {
    endpoint: '/api/notifications/remind',
    method: 'POST',
    prepareData: (users, taskId) => ({
      taskId,
      users: users.map((user) => ({
        email: user.email,
        userId: user.userId,
      })),
      type: 'task_reminder',
    }),
    successMessage: 'Reminders sent successfully',
    validateUsers: (users) =>
      users.every((user) => user.status === 'pending'),
    rateLimitPerMinute: 60, // Limit reminders to 60 per minute
  },
  share: {
    endpoint: '/api/tasks/share-results',
    method: 'POST',
    prepareData: (users, taskId) => ({
      taskId,
      results: users.map((user) => ({
        email: user.email,
        userId: user.userId,
        grade: user.averageGrade,
        status: user.status,
      })),
    }),
    successMessage: 'Results shared successfully',
    validateUsers: (users) =>
      users.every((user) => user.status !== 'pending'),
    rateLimitPerMinute: 50, // Limit result sharing to 50 per minute
  },
};

// Helper function to process users in batches with rate limiting
const processBatchWithRateLimit = async <T>(
  items: T[],
  processItem: (item: T) => Promise<void>,
  rateLimit: number,
  onProgress?: (current: number, total: number) => void
): Promise<void> => {
  const totalItems = items.length;
  const delayBetweenItems = (60 * 1000) / rateLimit; // Time in ms between items

  for (let i = 0; i < totalItems; i++) {
    await processItem(items[i]);

    // Invoke onProgress callback if provided
    if (onProgress) {
      onProgress(i + 1, totalItems);
    }

    // Rate limiting delay
    if (i < totalItems - 1) {
      await new Promise((resolve) => setTimeout(resolve, delayBetweenItems));
    }
  }
};

// Mock API call function (replace with actual API implementation)
const makeApiCall = async (
  endpoint: string,
  method: string,
  data: BulkActionData
): Promise<void> => {
  // Simulate API call
  console.log(`Making ${method} request to ${endpoint}`, data);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate random failure for testing
  if (Math.random() < 0.1) {
    throw new Error('Random API error');
  }
};

interface BulkActionOptions {
  taskId: string;
  onProgress?: (current: number, total: number) => void;
}

export const executeBulkAction = async (
  action: BulkAction,
  users: UserGradeInfo[],
  options: BulkActionOptions
): Promise<void> => {
  const { taskId, onProgress } = options;

  if (!users.length) {
    throw new Error('No users selected for bulk action');
  }

  const config = ACTION_CONFIGS[action];
  if (!config) {
    throw new Error(`Unknown bulk action: ${action}`);
  }

  // Validate users if needed
  if (config.validateUsers && !config.validateUsers(users)) {
    throw new Error(`Invalid users for ${action} action`);
  }

  try {
    // Prepare the data for the API call
    const preparedData = config.prepareData(users, taskId);

    if (config.rateLimitPerMinute) {
      // Process with rate limiting if configured
      await processBatchWithRateLimit(
        users,
        async (user) => {
          const singleUserData = config.prepareData([user], taskId);
          await makeApiCall(
            config.endpoint,
            config.method,
            singleUserData
          );
        },
        config.rateLimitPerMinute,
        onProgress
      );
    } else {
      // Single API call for all users
      await makeApiCall(config.endpoint, config.method, preparedData);
      // Invoke onProgress callback if provided
      if (onProgress) {
        onProgress(users.length, users.length);
      }
    }
  } catch (error: unknown) {
    console.error(`Bulk action ${action} failed:`, error);
    throw new Error(
      `Failed to execute ${action}: ${(error as Error).message}`
    );
  }
};

// Utility function to validate and prepare users for bulk actions
export const prepareBulkAction = (
  action: BulkAction,
  users: UserGradeInfo[]
): { validUsers: UserGradeInfo[]; invalidUsers: UserGradeInfo[] } => {
  const config = ACTION_CONFIGS[action];
  if (!config.validateUsers) {
    return { validUsers: users, invalidUsers: [] };
  }

  return users.reduce(
    (acc, user) => {
      if (config.validateUsers!([user])) {
        acc.validUsers.push(user);
      } else {
        acc.invalidUsers.push(user);
      }
      return acc;
    },
    { validUsers: [] as UserGradeInfo[], invalidUsers: [] as UserGradeInfo[] }
  );
};

// Export types and configs for external use
export type { BulkAction };
export { ACTION_CONFIGS };