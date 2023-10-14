export interface TimeEntry {
  description: string;
  start: Date;
  end: Date;
}

export interface DayEntries {
  day: Date;
  entries: TimeEntry[];
}
