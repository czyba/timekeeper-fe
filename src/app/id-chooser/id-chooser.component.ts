import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "id-chooser",
  templateUrl: "./id-chooser.component.html",
  styleUrls: ["./id-chooser.component.scss"],
})
export class IdChooserComponent {
  readonly id: FormControl<string | null> = new FormControl<string | null>("", [
    Validators.required,
    Validators.maxLength(40),
  ]);

  readonly randomId: string = crypto.randomUUID();
}
