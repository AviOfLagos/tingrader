// components/store/taskFormStore.ts

import { StateCreator, create } from 'zustand';
import { persist, PersistOptions, StorageValue, createJSONStorage } from 'zustand/middleware';
import { getFormattedDate, parseDateInput } from '../../../../utils/dateHelpers';
import { persistConfig } from './persistConfig';
export type GradingType = 'stars' | 'swipe';
export type TrackType = 'frontend' | 'backend' | 'design' | 'mobile';

export interface TaskFormData {
  title: string;
  description: string;
  track: TrackType;
  stage: number;
  gradingType: GradingType;
  dueDate: Date | null;
  maxSubmissions: number;
  requiredGrades: number;
  instructions: string;
  isDraft: boolean;
  gradingConfig: {
    maxStars?: number;
    passMarkPerGrader?: number;
  };
  settings: {
    allowLateSubmissions: boolean;
    gracePeriodHours: number;
    requireGraderFeedback: boolean;
    autoPublishGrades: boolean;
    notifyOnSubmission: boolean;
  };
}

export interface TaskFormState {
  formData: TaskFormData;
  updateForm: (data: Partial<TaskFormData>) => void;
  resetForm: () => void;
}

const initialFormData: TaskFormData = {
  title: '',
  description: '',
  track: 'frontend',
  stage: 1,
  gradingType: 'swipe',
  dueDate: null,
  maxSubmissions: 3,
  requiredGrades: 2,
  instructions: '',
  isDraft: true,
  gradingConfig: {},
  settings: {
    allowLateSubmissions: false,
    gracePeriodHours: 24,
    requireGraderFeedback: true,
    autoPublishGrades: false,
    notifyOnSubmission: true,
  },
};

// Custom storage that only uses localStorage when available (browser environment)
const storage =
  typeof window !== 'undefined'
    ? createJSONStorage<TaskFormState>(() => localStorage)
    : undefined;

// const persistConfig: PersistOptions<TaskFormState> = {
//   name: 'task-form-storage',
//   storage,
//   serialize: (state) => {
//     const stateCopy: StorageValue<TaskFormState> = {
//       version: state.version,
//       state: {
//         ...state.state,
//         formData: {
//           ...state.state.formData,
//           dueDate: state.state.formData.dueDate
//             ? state.state.formData.dueDate.toISOString()
//             : null,
//         },
//       },
//     };
//     return JSON.stringify(stateCopy);
//   },
//   deserialize: (str) => {
//     const state = JSON.parse(str) as StorageValue<TaskFormState>;
//     return {
//       ...state,
//       state: {
//         ...state.state,
//         formData: {
//           ...state.state.formData,
//           dueDate: state.state.formData.dueDate
//             ? new Date(state.state.formData.dueDate)
//             : null,
//         },
//       },
//     };
//   },
// };

export const useTaskFormStore = create<TaskFormState>()(
  persist(
    (set) => ({
      formData: initialFormData,
      updateForm: (data: Partial<TaskFormData>) =>
        set((state) => ({
          formData: {
            ...state.formData,
            ...data,
          },
        })),
      resetForm: () => set({ formData: initialFormData }),
    }),
    persistConfig
  )
);

// Example usage in a component:

// import { useTaskFormStore } from 'components/store/taskFormStore';
// import { getFormattedDate, parseDateInput } from 'utils/dateHelpers';

// const { formData, updateForm, resetForm } = useTaskFormStore();

// // Update a date
// updateForm({
//   dueDate: new Date(),
// });

// // Get formatted date for input
// const dateString = getFormattedDate(formData.dueDate);

// // Parse date from input
// const date = parseDateInput(inputValue);
// if (date) {
//   updateForm({ dueDate: date });
// }
