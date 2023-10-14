import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {
  CurrentTimeService,
  LocalCurrentTimeService,
} from "./current-time.service";
import { IdChooserComponent } from "./id-chooser/id-chooser.component";
import {
  InMemoryTimekeeperListService,
  TimekeeperListService,
} from "./timekeeper-list-service";
import { TimekeeperListComponent } from "./timekeeper-list/timekeeper-list.component";
import { TimekeeperTrackerComponent } from "./timekeeper-tracker/timekeeper-tracker.component";
import { TimekeeperComponent } from "./timekeeper/timekeeper.component";

@NgModule({
  declarations: [
    AppComponent,
    IdChooserComponent,
    TimekeeperListComponent,
    TimekeeperComponent,
    TimekeeperTrackerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatListModule,
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
  ],
  providers: [
    {
      provide: CurrentTimeService,
      useClass: LocalCurrentTimeService,
    },
    {
      provide: TimekeeperListService,
      useClass: InMemoryTimekeeperListService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
