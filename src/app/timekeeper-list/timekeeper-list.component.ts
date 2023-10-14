import { Component } from "@angular/core";
import { TimekeeperListService } from "../timekeeper-list-service";
import { Observable } from "rxjs";
import { DayEntries } from "../models/time-entry";

@Component({
  selector: "timekeeper-list",
  templateUrl: "./timekeeper-list.component.html",
  styleUrls: ["./timekeeper-list.component.scss"],
})
export class TimekeeperListComponent {
  currentEntries$: Observable<DayEntries[]>;

  constructor(readonly timekeeperListService: TimekeeperListService) {
    this.currentEntries$ = timekeeperListService.getCurrentEntriesObservable();
  }

  dateDiffInHours(from: Date, to: Date): number {
    const _MS_PER_MINUTE = 1000 * 60;
    // Discard the time and time-zone information.
    const fromMs = Date.UTC(
      from.getFullYear(),
      from.getMonth(),
      from.getDate(),
      from.getHours(),
      from.getMinutes(),
    );
    const toMs = Date.UTC(
      to.getFullYear(),
      to.getMonth(),
      to.getDate(),
      to.getHours(),
      to.getMinutes(),
    );
    const minutes = Math.floor((toMs - fromMs) / _MS_PER_MINUTE);

    return Math.trunc((minutes / 60) * 100) / 100;
  }
}
