import { ShareModule } from './../share/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZakatPayPageRoutingModule } from './zakat-pay-routing.module';

import { ZakatPayPage } from './zakat-pay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZakatPayPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ZakatPayPage]
})
export class ZakatPayPageModule {}
