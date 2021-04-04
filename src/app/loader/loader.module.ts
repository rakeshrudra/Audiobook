import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoaderPage } from './loader.page';
import { ShareModule } from '../share/share.module';

const routes: Routes = [
  {
    path: '',
    component: LoaderPage
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
  declarations: [LoaderPage]
})
export class LoaderPageModule {}
