import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MainsearchPage } from './mainsearch.page';
import { ShareModule } from '../share/share.module';

const routes: Routes = [
  {
    path: '',
    component: MainsearchPage
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
  declarations: [MainsearchPage]
})
export class MainsearchPageModule {}
