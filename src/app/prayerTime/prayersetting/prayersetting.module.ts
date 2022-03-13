import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrayersettingPageRoutingModule } from './prayersetting-routing.module';

import { PrayersettingPage } from './prayersetting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrayersettingPageRoutingModule
  ],
  declarations: [PrayersettingPage]
})
export class PrayersettingPageModule {}
