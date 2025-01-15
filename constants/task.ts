// constants/task.ts
export const TRACKS = {
  ALL: 'all',
  FRONTEND: 'frontend',
  BACKEND: 'backend',
  DESIGN: 'design',
  MOBILE: 'mobile',
} as const;

export const STAGES = {
  ALL: 'all',
  STAGE_1: '1',
  STAGE_2: '2',
  STAGE_3: '3',
} as const;

export const SORT_OPTIONS = {
  DUE_DATE: 'dueDate',
  SUBMISSIONS: 'submissions',
  STAGE: 'stage',
} as const;

export const VIEW_MODES = {
  GRID: 'grid',
  LIST: 'list',
} as const;