import { Component, type OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TimekeeperListService } from "../timekeeper-list-service";

@Component({
  selector: "timekeeper",
  templateUrl: "./timekeeper.component.html",
  styleUrls: ["./timekeeper.component.scss"],
})
export class TimekeeperComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly timekeeperListService: TimekeeperListService,
  ) {}

  ngOnInit(): void {
    // TODO: If 'id' null == error
    const id = this.route.snapshot.paramMap.get("id") as string;
    this.timekeeperListService.reset(id);
  }
}
