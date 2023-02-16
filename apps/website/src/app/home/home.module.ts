import { CommonModule }         from "@angular/common";
import { NgModule }             from "@angular/core";
import { FlexLayoutModule }     from "@angular/flex-layout";
import { RouterModule, Routes } from "@angular/router";
import { ComponentsModule }     from "@portfolio/components";
import { HomeComponent }        from "./home.component";


const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    ComponentsModule,
  ],
})
export class HomeModule {}
