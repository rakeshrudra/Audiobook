import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import { ShareModule } from '../share/share.module';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children : [
          { 
            path : 'home',
            loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
          },
          {
            path: 'history',
            loadChildren: () => import('../history/history.module').then(m => m.HistoryPageModule) 
          },
          {
            path: 'search',
            loadChildren: () => import('../search/search.module').then(m => m.SearchPageModule) 
          },
          {
            path: 'menu',
            loadChildren: () => import('../menu/menu.module').then(m => m.MenuPageModule) 
          },
      /*{ 
        path : '',
        redirectTo : 'home'
      }*/
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
