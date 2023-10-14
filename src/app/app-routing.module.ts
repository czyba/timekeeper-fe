import { NgModule } from "@angular/core";
import { RouterModule, type Routes } from "@angular/router";
import { IdChooserComponent } from "./id-chooser/id-chooser.component";
import { TimekeeperComponent } from "./timekeeper/timekeeper.component";

const routes: Routes = [
  { path: "", component: IdChooserComponent },
  { path: ":id", component: TimekeeperComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
