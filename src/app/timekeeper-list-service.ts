import { Injectable } from "@angular/core";
import { BehaviorSubject, type Observable } from "rxjs";
import { type DayEntries, type TimeEntry } from "./models/time-entry";

export interface TimekeeperListServiceInterface {
  getCurrentEntriesObservable(): Observable<DayEntries[]>;
  addEntry(timeEntry: TimeEntry): void;
  reset(id: string): void;
}

export abstract class TimekeeperListService
  implements TimekeeperListServiceInterface
{
  public abstract getCurrentEntriesObservable(): Observable<DayEntries[]>;
  public abstract addEntry(timeEntry: TimeEntry): void;
  public abstract reset(id: string): void;
}

@Injectable()
export class InMemoryTimekeeperListService extends TimekeeperListService {
  private readonly currentEntries: BehaviorSubject<DayEntries[]> =
    new BehaviorSubject<DayEntries[]>([]);
  readonly currentEntries$: Observable<DayEntries[]> =
    this.currentEntries.asObservable();
  private currentId: string | null = null;
  private readonly idToDayEntriesMap = new Map<string, DayEntries[]>();

  public override addEntry(timeEntry: TimeEntry): void {
    const copy = [...this.currentEntries.getValue()];
    const start = timeEntry.start;
    const day = new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate(),
    );
    if (copy.length === 0) {
      copy.unshift({
        day,
        entries: [timeEntry],
      });
    } else {
      const firstDayEntry = copy[0];
      if (firstDayEntry.day.getTime() === day.getTime()) {
        copy[0] = {
          ...firstDayEntry,
          entries: [timeEntry, ...firstDayEntry.entries],
        };
      } else {
        copy.unshift({
          day,
          entries: [timeEntry],
        });
      }
    }

    this.currentEntries.next(copy);
  }

  public override reset(id: string): void {
    if (this.currentId !== null) {
      this.idToDayEntriesMap.set(this.currentId, this.currentEntries.value);
    }
    const entryToSet = this.idToDayEntriesMap.get(id) ?? [];
    this.currentEntries.next(entryToSet);
    this.currentId = id;
  }

  public override getCurrentEntriesObservable(): Observable<DayEntries[]> {
    return this.currentEntries$;
  }
}
