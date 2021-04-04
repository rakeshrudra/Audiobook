import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PlayPage } from './play.page';

import { AudioProvider } from '../service/audio-service';

import { ShareModule } from '../share/share.module';

const routes: Routes = [
  {
    path: '',
    component: PlayPage
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
  providers : [
    AudioProvider,
  ],
  declarations: [PlayPage]
})
export class PlayPageModule {}
