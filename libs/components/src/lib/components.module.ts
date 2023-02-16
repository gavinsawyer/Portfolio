import { CommonModule }     from "@angular/common";
import { NgModule }         from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FocusComponent }   from "./focus/focus.component";


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
  ],
  declarations: [FocusComponent],
  exports: [FocusComponent],
})
export class ComponentsModule {}
