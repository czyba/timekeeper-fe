import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";
import { CurrentTimeService } from "../current-time.service";
import { TimekeeperListService } from "../timekeeper-list-service";

@Component({
  selector: "timekeeper-tracker",
  templateUrl: "./timekeeper-tracker.component.html",
  styleUrls: ["./timekeeper-tracker.component.scss"],
})
export class TimekeeperTrackerComponent {
  readonly description: FormControl<string> = new FormControl<string>("", {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(100)],
  });

  private readonly start: BehaviorSubject<Date | null> =
    new BehaviorSubject<Date | null>(null);
  readonly start$: Observable<Date | null> = this.start.asObservable();
  currentTime$: Observable<Date>;

  constructor(
    readonly timekeeperListService: TimekeeperListService,
    readonly currentTimeService: CurrentTimeService,
  ) {
    this.currentTime$ = currentTimeService.getCurrentTimeObservable();
  }

  onStart(): void {
    this.start.next(new Date());
  }

  onStop(): void {
    const start = this.start.value;
    if (start === null) {
      // Invariant Error
      return;
    }

    this.timekeeperListService.addEntry({
      description: this.description.value,
      start,
      end: new Date(),
    });
    this.start.next(null);
    this.description.setValue("");
  }
}
