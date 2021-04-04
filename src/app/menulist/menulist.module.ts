import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenulistPage } from './menulist.page';
import { ModuleService } from '../resolver/module.service';

const routes: Routes = [
  {
    path: '',
    component: MenulistPage,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenulistPage]
})
export class MenulistPageModule {}
