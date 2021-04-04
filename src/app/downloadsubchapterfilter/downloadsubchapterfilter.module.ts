import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DownloadsubchapterfilterPage } from './downloadsubchapterfilter.page';

const routes: Routes = [
  {
    path: '',
    component: DownloadsubchapterfilterPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DownloadsubchapterfilterPage]
})
export class DownloadsubchapterfilterPageModule {}
