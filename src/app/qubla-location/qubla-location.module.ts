import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QublaLocationPageRoutingModule } from './qubla-location-routing.module';

import { QublaLocationPage } from './qubla-location.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QublaLocationPageRoutingModule
  ],
  declarations: [QublaLocationPage]
})
export class QublaLocationPageModule {}
