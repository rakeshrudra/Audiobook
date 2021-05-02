import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HistoryPage } from './history.page';
import { ShareModule } from '../share/share.module';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HistoryPage,
    canActivate : [AuthGuard]
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
  declarations: [HistoryPage]
})
export class HistoryPageModule {}
