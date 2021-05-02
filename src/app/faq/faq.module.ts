import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { AuthGuard } from '../auth.guard';
import { FaqPage } from './faq.page';

const routes: Routes = [
  {
    path: '',
    component: FaqPage,
    canActivate : [AuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FaqPage]
})
export class FaqPageModule {}
