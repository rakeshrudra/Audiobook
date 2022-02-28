import { ShareModule } from './../share/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrayerTimePageRoutingModule } from './prayer-time-routing.module';

import { PrayerTimePage } from './prayer-time.page';
import { SuperTabsModule } from '@ionic-super-tabs/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrayerTimePageRoutingModule,
    ShareModule,
    SuperTabsModule
  ],
  declarations: [PrayerTimePage]
})
export class PrayerTimePageModule {}
