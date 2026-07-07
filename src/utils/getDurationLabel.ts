import type { Duration } from "../types/courseType";

export function getDurationLabel(hours: number): Duration {
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
