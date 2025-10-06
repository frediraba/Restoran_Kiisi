import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { cn } from "@/lib/utils";

type QuickPick = {
  id: string;
  label: string;
  description?: string;
  value: string;
};

type DateTimePickerProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  description?: string;
  className?: string;
  quickPicks?: QuickPick[];
  onQuickPick?: (pick: QuickPick) => void;
  activeQuickPickId?: string | null;
  stepMinutes?: number;
};

function toDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toTimeInputValue(date: Date) {
  const hours = `${date.getHours()}`.padStart(2, "0");
  const minutes = `${date.getMinutes()}`.padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function toLocalInputValue(date: Date) {
  return `${toDateInputValue(date)}T${toTimeInputValue(date)}`;
}

function fromLocalInputValue(value: string) {
  if (!value || value.length < 16) {
    return null;
  }
  const [datePart, timePart] = value.split("T");
  if (!datePart || !timePart) {
    return null;
  }
  return { date: datePart, time: timePart.slice(0, 5) };
}

function combineLocalDateTime(date: string, time: string) {
  return `${date}T${time}`;
}

function normalizeTimeValue(rawTime: string, stepMinutes: number, fallback: string) {
  if (!rawTime) {
    return fallback;
  }

  const [hoursPart, minutesPart] = rawTime.split(":");
  const hours = Number.parseInt(hoursPart, 10);
  const minutes = Number.parseInt(minutesPart, 10);

  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
    return fallback;
  }

  const totalMinutes = hours * 60 + minutes;
  const stepCount = Math.round(totalMinutes / stepMinutes);
  const maxStepsPerDay = Math.floor((24 * 60) / stepMinutes) - 1;
  const clampedStep = Math.min(Math.max(stepCount, 0), maxStepsPerDay);
  const normalizedMinutes = clampedStep * stepMinutes;
  const normalizedHours = Math.floor(normalizedMinutes / 60);
  const remainderMinutes = normalizedMinutes % 60;

  const normalizedHoursString = `${normalizedHours}`.padStart(2, "0");
  const normalizedMinutesString = `${remainderMinutes}`.padStart(2, "0");

  return `${normalizedHoursString}:${normalizedMinutesString}`;
}

function normalizeLocalValue(value: string, stepMinutes: number) {
  const parts = fromLocalInputValue(value);
  if (!parts) {
    return null;
  }

  const normalizedTime = normalizeTimeValue(parts.time, stepMinutes, parts.time);
  return combineLocalDateTime(parts.date, normalizedTime);
}

export function DateTimePickerField({
  id,
  label,
  value,
  onChange,
  description,
  className,
  quickPicks,
  onQuickPick,
  activeQuickPickId,
  stepMinutes = 30,
}: DateTimePickerProps) {
  const fallbackValue = useMemo(() => {
    const date = new Date();
    const remainder = date.getMinutes() % stepMinutes;
    if (remainder !== 0) {
      date.setMinutes(date.getMinutes() + (stepMinutes - remainder));
    }
    return toLocalInputValue(date);
  }, [stepMinutes]);

  const normalizedValue = useMemo(() => {
    if (value) {
      const normalized = normalizeLocalValue(value, stepMinutes);
      if (normalized) {
        return normalized;
      }
    }
    return fallbackValue;
  }, [value, stepMinutes, fallbackValue]);

  const parsed = useMemo(
    () => fromLocalInputValue(normalizedValue) ?? fromLocalInputValue(fallbackValue)!,
    [normalizedValue, fallbackValue],
  );

  const [selectedDate, setSelectedDate] = useState(parsed.date);
  const [selectedTime, setSelectedTime] = useState(parsed.time);

  useEffect(() => {
    const nextParsed = fromLocalInputValue(normalizedValue);
    if (nextParsed) {
      setSelectedDate(nextParsed.date);
      setSelectedTime(nextParsed.time);
    }
  }, [normalizedValue]);

  return (
    <div className={cn("grid gap-3", className)}>
      <div className="grid gap-1">
        <Label htmlFor={`${id}-date`}>{label}</Label>
        {description ? <p className="text-xs text-muted-foreground">{description}</p> : null}
      </div>

      {quickPicks && quickPicks.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {quickPicks.map((pick) => (
            <Button
              key={pick.id}
              type="button"
              variant={activeQuickPickId === pick.id ? "secondary" : "ghost"}
              className="rounded-full px-4 py-2 text-xs"
              onClick={() => onQuickPick?.(pick)}
            >
              <div className="flex flex-col text-left">
                <span className="font-medium leading-none">{pick.label}</span>
                {pick.description ? (
                  <span className="text-[0.65rem] font-normal text-muted-foreground">{pick.description}</span>
                ) : null}
              </div>
            </Button>
          ))}
        </div>
      ) : null}

      <div className="grid gap-2 sm:grid-cols-2">
        <Input
          id={`${id}-date`}
          data-testid={`${id}-date`}
          type="date"
          value={selectedDate}
          onChange={(event) => {
            const nextDate = event.target.value;
            setSelectedDate(nextDate);
            onChange(combineLocalDateTime(nextDate, selectedTime));
          }}
        />
        <Input
          id={`${id}-time`}
          data-testid={`${id}-time`}
          type="time"
          step={stepMinutes * 60}
          value={selectedTime}
          onChange={(event) => {
            const nextTime = normalizeTimeValue(event.target.value, stepMinutes, selectedTime);
            setSelectedTime(nextTime);
            onChange(combineLocalDateTime(selectedDate, nextTime));
          }}
        />
      </div>
    </div>
  );
}

export function toISOStringFromLocalInput(value: string) {
  if (!value) {
    return "";
  }
  const parts = fromLocalInputValue(value);
  if (!parts) {
    return "";
  }
  const [hours, minutes] = parts.time.split(":").map((part) => Number.parseInt(part, 10));
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
    return "";
  }

  const [year, month, day] = parts.date.split("-").map((part) => Number.parseInt(part, 10));
  if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) {
    return "";
  }

  const date = new Date(year, month - 1, day, hours, minutes, 0, 0);
  return date.toISOString();
}

export function getDefaultLocalValue(hours: number, minutes: number) {
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return toLocalInputValue(date);
}
