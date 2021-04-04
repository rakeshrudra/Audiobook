import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AudiotopPage } from './audiotop.page';
import { ShareModule } from '../share/share.module';

const routes: Routes = [
  {
    path: '',
    component: AudiotopPage
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
  declarations: [AudiotopPage]
})
export class AudiotopPageModule {}
