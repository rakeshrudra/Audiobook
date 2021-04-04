import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BookmodalPage } from './bookmodal.page';
import { ShareModule } from '../share/share.module';

const routes: Routes = [
  {
    path: '',
    component: BookmodalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ShareModule
  ],
  declarations: [BookmodalPage]
})
export class BookmodalPageModule {}
