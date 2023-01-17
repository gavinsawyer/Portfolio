import { CommonModule }         from "@angular/common";
import { NgModule }             from "@angular/core";
import { FlexLayoutModule }     from "@angular/flex-layout";
import { ReactiveFormsModule }  from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent }        from "./home.component";


const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FlexLayoutModule, ReactiveFormsModule],
})
export class HomeModule {}
