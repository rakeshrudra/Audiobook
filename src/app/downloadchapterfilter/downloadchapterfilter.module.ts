import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DownloadchapterfilterPage } from './downloadchapterfilter.page';

const routes: Routes = [
  {
    path: '',
    component: DownloadchapterfilterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DownloadchapterfilterPage]
})
export class DownloadchapterfilterPageModule {}
