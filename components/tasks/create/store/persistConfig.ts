// components/store/persistConfig.ts

import { PersistOptions, PersistStorage, StorageValue } from 'zustand/middleware';
import { TaskFormState } from './taskFormStore';

const customStorage: PersistStorage<TaskFormState> = {
  getItem: async (name: string): Promise<StorageValue<TaskFormState> | null> => {
    if (typeof window === 'undefined') return null; // Ensure window is available

    const storedValue = localStorage.getItem(name);
    if (!storedValue) return null;

    // Parse the stored value
    const parsedValue = JSON.parse(storedValue) as StorageValue<TaskFormState>;

    // Convert 'dueDate' from string back to Date object
    const dueDateString = parsedValue.state.formData.dueDate as unknown as string | null;
    if (dueDateString) {
      parsedValue.state.formData.dueDate = new Date(dueDateString);
    } else {
      parsedValue.state.formData.dueDate = null;
    }

    return parsedValue;
  },
  setItem: async (name: string, value: StorageValue<TaskFormState>): Promise<void> => {
    if (typeof window === 'undefined') return; // Ensure window is available

    // Clone the value to avoid mutating original state
    const valueToStore: StorageValue<TaskFormState> = JSON.parse(JSON.stringify(value));

    // Convert 'dueDate' from Date object to string
    const dueDate = valueToStore.state.formData.dueDate;
    if (dueDate instanceof Date) {
      valueToStore.state.formData.dueDate = dueDate.toISOString() as unknown as Date;
    } else {
      valueToStore.state.formData.dueDate = null;
    }

    // Store the serialized value
    localStorage.setItem(name, JSON.stringify(valueToStore));
  },
  removeItem: async (name: string): Promise<void> => {
    if (typeof window === 'undefined') return; // Ensure window is available

    localStorage.removeItem(name);
  },
};

export const persistConfig: PersistOptions<TaskFormState> = {
  name: 'task-form-storage',
  storage: customStorage,
};