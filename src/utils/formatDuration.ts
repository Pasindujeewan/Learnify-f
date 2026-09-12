import type { DurationOption } from "../types/course.types";

export function getDurationLabel(hours: number): DurationOption {
  if (hours < 1) {
    return "Less than 1 hour";
  }

  if (hours <= 3) {
    return "1-3 hours";
  }

  if (hours <= 6) {
    return "3-6 hours";
  }

  return "More than 6 hours";
}

export function formatDurationHours(hours: number): string {
  if (!hours || isNaN(hours)) return "0h";
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (m === 0) return `${h}h`;
  if (h === 0) return `${m}m`;
  return `${h}h ${m}m`;
}
