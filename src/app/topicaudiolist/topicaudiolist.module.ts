import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TopicaudiolistPage } from './topicaudiolist.page';
import { ShareModule } from '../share/share.module';

const routes: Routes = [
  {
    path: '',
    component: TopicaudiolistPage
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
  declarations: [TopicaudiolistPage]
})
export class TopicaudiolistPageModule {}
