import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { AsideComponent } from './aside/aside.component';
import { ButtonComponent } from './button/button.component';
import { FocusComponent } from './focus/focus.component';
import { IconButtonComponent } from './icon-button/icon-button.component';
import { MessageFormComponent } from './message-form/message-form.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
  ],
  declarations: [
    AsideComponent,
    ButtonComponent,
    FocusComponent,
    IconButtonComponent,
    MessageFormComponent,
  ],
  exports: [
    AsideComponent,
    ButtonComponent,
    FocusComponent,
    IconButtonComponent,
    MessageFormComponent,
  ],
})
export class ComponentsModule {}
