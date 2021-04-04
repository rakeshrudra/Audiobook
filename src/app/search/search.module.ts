import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SearchPage } from './search.page';
import { ShareModule } from '../share/share.module';
import { ModuleService } from '../resolver/module.service';
import { AllbooksService } from '../resolver/allbooks.service';

const routes: Routes = [
  {
    path: '',
    component: SearchPage,
   // resolve : {module : ModuleService, books : AllbooksService}

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
  declarations: [SearchPage]
})
export class SearchPageModule {}
