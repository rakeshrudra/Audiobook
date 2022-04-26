import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AudioContentPageRoutingModule } from './audio-content-routing.module';

import { AudioContentPage } from './audio-content.page';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AudioContentPageRoutingModule,
    ShareModule
  ],
  declarations: [AudioContentPage]
})
export class AudioContentPageModule {}
