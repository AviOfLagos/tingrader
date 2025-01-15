// components/tasks/grades/components/export/utils/exportFormatters.ts
import { UserGradeInfo } from "@/types/task";
import * as XLSX from "xlsx";

export type ExportFormat = "clipboard" | "csv" | "excel" | "sheets";

const GOOGLE_SHEETS_URL = "https://docs.google.com/spreadsheets/create";

interface ExportField<T extends string | number | Date | boolean | undefined> {
  key: keyof UserGradeInfo | string;
  label: string;
  format?: (value: T) => string;
}

const EXPORT_FIELDS: ExportField<UserGradeInfo[keyof UserGradeInfo]>[] = [
  { key: "userId", label: "User ID" },
  { key: "email", label: "Email" },
  {
    key: "averageGrade",
    label: "Average Grade",
    format: (value) => (value !== undefined ? (value as number).toFixed(2) : ''),
  },
  {
    key: "status",
    label: "Status",
    format: (value) => (value !== undefined ? (value as string).charAt(0).toUpperCase() + (value as string).slice(1) : ''),
  },
  {
    key: "submittedAt",
    label: "Submission Date",
    format: (value) => (value !== undefined ? new Date(value as string).toLocaleDateString() : ''),
  },
  {
    key: "lastGradedAt",
    label: "Last Graded",
    format: (value) =>
      value ? new Date(value as string).toLocaleDateString() : "Not graded",
  },
];

export const formatExport = async (
  users: UserGradeInfo[],
  format: ExportFormat,
  taskTitle: string
): Promise<string | ArrayBuffer> => {
  // Prepare data in a consistent format
  const formattedData = users.map((user) => {
    const row: Record<string, string | number | Date> = {};
    EXPORT_FIELDS.forEach((field) => {
      const value = user[field.key as keyof UserGradeInfo];
      row[field.label] = field.format && value !== undefined
        ? field.format(value)
        : value !== undefined ? String(value) : '';
    });
    return row;
  });

  switch (format) {
    case "clipboard":
      // Format for clipboard (emails only)
      return users.map((user) => user.email).join("\n");

    case "csv":
      // Format as CSV
      const headers = EXPORT_FIELDS.map((field) => field.label);
      const csvRows = [
        headers.join(","),
        ...formattedData.map((row) =>
          headers.map((header) => `"${row[header]}"`).join(",")
        ),
      ];
      return csvRows.join("\n");

    case "excel":
      // Format as Excel
      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Grades");

      // Style the header row
      const headerStyle = {
        font: { bold: true },
        alignment: { horizontal: "center" },
        fill: { fgColor: { rgb: "EEEEEE" } },
      };

      // Apply styles to header row
      const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1");
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellRef = XLSX.utils.encode_cell({ r: 0, c: col });
        worksheet[cellRef].s = headerStyle;
      }

      const columnWidths = formattedData.reduce(
        (acc, row) => {
          Object.entries(row).forEach(([key, value]) => {
            const valueAsString = typeof value === 'object' && value instanceof Date ? value.toLocaleDateString() : String(value);
            const length = valueAsString.length;
            acc[key] = Math.max(typeof acc[key] === 'number' ? acc[key] : 0, length);
          });
          return acc;
        },
        {} as Record<string, number>
      );

      
            worksheet["!cols"] = Object.values(columnWidths).map((width) => ({
              width: Number(width),
            }));
      return XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    case "sheets":
      // Generate Google Sheets URL with data
      const sheetsData = encodeURIComponent(JSON.stringify(formattedData));
      return `${GOOGLE_SHEETS_URL}?title=${encodeURIComponent(taskTitle)}&data=${sheetsData}`;

    default:
      throw new Error(`Unsupported export format: ${format}`);
  }
};

export const validateExportData = (users: UserGradeInfo[]): boolean => {
  return users.every(
    (user) =>
      user.userId &&
      user.email &&
      typeof user.averageGrade === "number" &&
      ["pass", "fail", "pending"].includes(user.status)
  );
};

export const getExportFileName = (
  taskTitle: string,
  format: ExportFormat
): string => {
  const sanitizedTitle = taskTitle.replace(/[^a-z0-9]/gi, "-").toLowerCase();
  const timestamp = new Date().toISOString().split("T")[0];
  return `${sanitizedTitle}-grades-${timestamp}.${format}`;
};
