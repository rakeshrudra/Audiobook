import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DownloadPage } from './download.page';
import { ShareModule } from '../share/share.module';
import { DownloadfilterPageModule } from '../downloadfilter/downloadfilter.module';

const routes: Routes = [
  {
    path: '',
    component: DownloadPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ShareModule,
  ],  
  declarations: [DownloadPage]
})
export class DownloadPageModule {}
