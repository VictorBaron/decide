import { z } from "zod";

export const isoDateOnly = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD")
  .refine((s) => {
    const [y, m, d] = s.split("-").map(Number);
    const dt = new Date(y, m - 1, d);
    // Check it round-trips (catches 2026-02-31 etc.)
    return (
      dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d
    );
  }, "Invalid date");

export const notInThePast = isoDateOnly.refine((s) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [y, m, d] = s.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt >= today;
}, "Date must be today or in the future");
