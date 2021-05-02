import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { AuthGuard } from '../auth.guard';
import { TestimonialPage } from './testimonial.page';

const routes: Routes = [
  {
    path: '',
    component: TestimonialPage,
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
  declarations: [TestimonialPage]
})
export class TestimonialPageModule {}
