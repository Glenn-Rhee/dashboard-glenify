"use client";
import * as React from "react";
import {
  format,
  subDays,
  startOfMonth,
  endOfMonth,
  startOfYear,
} from "date-fns";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { DateRange } from "react-day-picker";

function getPresetRange(preset: string): DateRange {
  const today = new Date();

  switch (preset) {
    case "today":
      return { from: today, to: today };
    case "yesterday":
      const yesterday = subDays(today, 1);
      return { from: yesterday, to: yesterday };
    case "last7":
      return { from: subDays(today, 6), to: today };
    case "last30":
      return { from: subDays(today, 29), to: today };
    case "thisMonth":
      return { from: startOfMonth(today), to: today };
    case "lastMonth":
      const lastMonthStart = startOfMonth(subDays(startOfMonth(today), 1));
      const lastMonthEnd = endOfMonth(lastMonthStart);
      return { from: lastMonthStart, to: lastMonthEnd };
    case "thisYear":
      return { from: startOfYear(today), to: today };
    default:
      return { from: today, to: today };
  }
}

const PRESETS = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 Days", value: "last7" },
  { label: "Last 30 Days", value: "last30" },
  { label: "This Month", value: "thisMonth" },
  { label: "Last Month", value: "lastMonth" },
  { label: "This Year", value: "thisYear" },
];

interface Props {
  dateRange: DateRange | undefined;
  onDateChange: (date: Props["dateRange"] | undefined) => void;
}

export function DatePicker(props: Props) {
  const { dateRange, onDateChange } = props;
  const [isOpen, setIsOpen] = React.useState(false);

  const [label, setLabel] = React.useState<string>("Pick a date");

  const handlePresetSelect = (preset: { label: string; value: string }) => {
    const range = getPresetRange(preset.value);
    onDateChange(range);
    setLabel(preset.label);
    setIsOpen(false);
  };

  const handleCalendarSelect = (range: DateRange | undefined) => {
    onDateChange(range);
    if (range?.from) {
      const fromStr = format(range.from, "d MMM yyyy");
      const toStr = range.to ? format(range.to, "d MMM yyyy") : fromStr;
      setLabel(range.to ? `${fromStr} - ${toStr}` : fromStr);
    }
  };

  return (
    <DropdownMenu modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-56 bg-transparent hover:bg-transparent justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
        >
          <span className="truncate">{label}</span>
          {isOpen ? (
            <ChevronUpIcon className="shrink-0" />
          ) : (
            <ChevronDownIcon className="shrink-0" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="start">
        {PRESETS.map((preset) => (
          <DropdownMenuItem
            key={preset.value}
            onSelect={(e) => {
              e.preventDefault();
              handlePresetSelect(preset);
            }}
          >
            {preset.label}
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="flex items-center justify-between">
            Custom Range
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent align="end" className="p-0">
              <Calendar
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={handleCalendarSelect}
                numberOfMonths={2}
                captionLayout="dropdown"
                className="rounded-lg border"
              />
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
