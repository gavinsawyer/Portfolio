import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PrivacyComponent }     from './privacy.component';


const routes: Routes = [{ path: '', component: PrivacyComponent }];

@NgModule({
  declarations: [PrivacyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class PrivacyModule {}
