import { CommonModule }         from "@angular/common";
import { NgModule }             from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OtherwiseComponent }   from "./otherwise.component";


const routes: Routes = [{ path: '', component: OtherwiseComponent }];

@NgModule({
  declarations: [OtherwiseComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class OtherwiseModule {}
