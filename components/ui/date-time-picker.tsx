// components/ui/date-time-picker.tsx
"use client";

import * as React from "react";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateTimePickerProps {
  date: Date | null | undefined;
  setDate: (date: Date | null | undefined) => void;
  includeTime?: boolean;
}

export function DateTimePicker({
  date,
  setDate,
  includeTime = true,
}: DateTimePickerProps) {
  const [selectedTime, setSelectedTime] = React.useState<{
    hours: string;
    minutes: string;
  }>({
    hours: "23",
    minutes: "59",
  });

  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      if (includeTime) {
        newDate.setHours(parseInt(selectedTime.hours));
        newDate.setMinutes(parseInt(selectedTime.minutes));
      }
      setDate(newDate);
    } else {
      setDate(undefined);
    }
  };

  const handleTimeChange = (type: "hours" | "minutes", value: string) => {
    const newTime = {
      ...selectedTime,
      [type]: value,
    };
    setSelectedTime(newTime);

    if (date) {
      const newDate = new Date(date);
      newDate.setHours(parseInt(newTime.hours));
      newDate.setMinutes(parseInt(newTime.minutes));
      setDate(newDate);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date ? "text-muted-foreground" : undefined
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, includeTime ? "PPP HH:mm" : "PPP")
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date ?? undefined}
          onSelect={handleSelect}
          disabled={(date) => date < new Date()}
          initialFocus
        />
        {includeTime && (
          <div className="border-t border-border p-3 space-y-2">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Time</span>
            </div>
            <div className="flex items-center space-x-2">
              <Select
                value={selectedTime.hours}
                onValueChange={(value) => handleTimeChange("hours", value)}
              >
                <SelectTrigger className="w-[70px]">
                  <SelectValue placeholder="Hours" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {hours.map((hour) => (
                    <SelectItem key={hour} value={hour}>
                      {hour}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-sm">:</span>
              <Select
                value={selectedTime.minutes}
                onValueChange={(value) => handleTimeChange("minutes", value)}
              >
                <SelectTrigger className="w-[70px]">
                  <SelectValue placeholder="Minutes" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {minutes.map((minute) => (
                    <SelectItem key={minute} value={minute}>
                      {minute}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
