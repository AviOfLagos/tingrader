// utils/dateHelpers.ts

export const getFormattedDate = (date: Date | null): string => {
  if (!date) return "";
  return date.toISOString().split("T")[0];
};

export const parseDateInput = (dateString: string): Date | null => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
};