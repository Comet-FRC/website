import { format, parseISO } from "date-fns";

/**
 * Format a date in a human-readable format
 */
export function formatDate(date, formatStr = "MMMM d, yyyy") {
  if (!date) return "";

  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return format(dateObj, formatStr);
}

/**
 * Normalize a date to midnight for calendar comparisons
 */
function normalizeDate(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Check if a date is today or in the future
 */
export function isFutureDate(date) {
  if (!date) return false;

  const today = normalizeDate(new Date());
  const eventDate = normalizeDate(
    typeof date === "string" ? parseISO(date) : date
  );

  return eventDate >= today;
}

/**
 * Check if a date is strictly in the past
 */
export function isPastDate(date) {
  if (!date) return false;

  const today = normalizeDate(new Date());
  const eventDate = normalizeDate(
    typeof date === "string" ? parseISO(date) : date
  );

  return eventDate < today;
}
