import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZakatPayPageRoutingModule } from './zakat-pay-routing.module';

import { ZakatPayPage } from './zakat-pay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZakatPayPageRoutingModule
  ],
  declarations: [ZakatPayPage]
})
export class ZakatPayPageModule {}
