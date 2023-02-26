import { CommonModule }         from "@angular/common";
import { NgModule }             from "@angular/core";
import { ReactiveFormsModule }  from "@angular/forms";
import { NgxMaskModule }        from "ngx-mask";
import { AsideComponent }       from "./aside/aside.component";
import { ButtonComponent }      from "./button/button.component";
import { FocusComponent }       from "./focus/focus.component";
import { IconButtonComponent }  from "./icon-button/icon-button.component";
import { MessageFormComponent } from "./message-form/message-form.component";
import { PhotoComponent }       from "./photo/photo.component";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
  ],
  declarations: [
    AsideComponent,
    ButtonComponent,
    FocusComponent,
    IconButtonComponent,
    MessageFormComponent,
    PhotoComponent,
  ],
  exports: [
    AsideComponent,
    ButtonComponent,
    FocusComponent,
    IconButtonComponent,
    MessageFormComponent,
    PhotoComponent,
  ],
})
export class ComponentsModule {}
