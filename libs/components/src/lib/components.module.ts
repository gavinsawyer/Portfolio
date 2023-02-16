import { CommonModule }         from '@angular/common';
import { NgModule }             from '@angular/core';
import { FlexLayoutModule }     from '@angular/flex-layout';
import { ReactiveFormsModule }  from "@angular/forms";
import { NgxMaskModule }        from "ngx-mask";
import { FocusComponent }       from './focus/focus.component';
import { MessageFormComponent } from './message-form/message-form.component';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NgxMaskModule,
  ],
  declarations: [
    FocusComponent,
    MessageFormComponent,
  ],
  exports: [
    FocusComponent,
    MessageFormComponent,
  ],
})
export class ComponentsModule {}
