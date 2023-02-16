import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { FocusComponent } from './focus/focus.component';
import { MessageFormComponent } from './message-form/message-form.component';
import { ButtonComponent } from './button/button.component';
import { AsideComponent } from './aside/aside.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NgxMaskModule.forChild(),
  ],
  declarations: [
    FocusComponent,
    MessageFormComponent,
    ButtonComponent,
    AsideComponent,
  ],
  exports: [FocusComponent, MessageFormComponent, ButtonComponent, AsideComponent],
})
export class ComponentsModule {}
