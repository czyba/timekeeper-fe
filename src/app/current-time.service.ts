import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

export interface CurrentTimeServiceInterface {
  getCurrentTimeObservable(): Observable<Date>;
}

export abstract class CurrentTimeService
  implements CurrentTimeServiceInterface
{
  public abstract getCurrentTimeObservable(): Observable<Date>;
}

@Injectable()
export class LocalCurrentTimeService
  extends CurrentTimeService
  implements OnDestroy
{
  private readonly currentTime: BehaviorSubject<Date> = new BehaviorSubject(
    new Date(),
  );
  private readonly currentTime$: Observable<Date> =
    this.currentTime.asObservable();
  private timerHandle: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    super();
    const now = new Date();
    const msToNextMinute = this.msToNextMinute(now);
    const updateMinuteCallback = () => {
      const now = new Date();
      this.currentTime.next(now);
      this.timerHandle = setTimeout(
        updateMinuteCallback,
        this.msToNextMinute(now),
      );
    };
    this.timerHandle = setTimeout(updateMinuteCallback, msToNextMinute);
  }

  private msToNextMinute(date: Date): number {
    return 1000 * (60 - date.getSeconds()) + date.getMilliseconds();
  }

  ngOnDestroy(): void {
    if (this.timerHandle !== null) {
      clearTimeout(this.timerHandle);
      this.timerHandle = null;
    }
  }

  public override getCurrentTimeObservable(): Observable<Date> {
    return this.currentTime$;
  }
}
