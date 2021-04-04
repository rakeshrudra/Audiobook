import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChapterPage } from './chapter.page';
import { ShareModule } from '../share/share.module';

const routes: Routes = [
  {
    path: '',
    component: ChapterPage
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
  declarations: [ChapterPage]
})
export class ChapterPageModule {}
