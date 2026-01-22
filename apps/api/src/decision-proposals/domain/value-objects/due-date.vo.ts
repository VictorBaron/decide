import { addDays, isBefore, isEqual } from "date-fns";

export class DueDate {
  constructor(private readonly date: Date) {
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date format");
    }
    this.date = date;
  }

  static create(value: Date | string): DueDate {
    const date = typeof value === "string" ? new Date(value) : value;

    const dueDate = new DueDate(date);
    if (dueDate.isOverdue) {
      throw new Error("Due date cannot be created in the past");
    }
    return dueDate;
  }

  getDate(): Date {
    return this.date;
  }

  get isOverdue(): boolean {
    return this.date < new Date();
  }

  isDueSoon(daysThreshold: number = 2): boolean {
    if (this.isOverdue) return false;

    const threshold = addDays(new Date(), daysThreshold);

    return isBefore(this.date, threshold);
  }

  equals(other: DueDate): boolean {
    return isEqual(this.date, other.getDate());
  }
}
