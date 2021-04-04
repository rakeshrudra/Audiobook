import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';
import { ModuleService } from '../resolver/module.service';
import { DownloadfilterPageModule } from '../downloadfilter/downloadfilter.module';
import { DownloadchapterfilterPageModule } from '../downloadchapterfilter/downloadchapterfilter.module';
import { DownloadsubchapterfilterPageModule } from '../downloadsubchapterfilter/downloadsubchapterfilter.module';

const routes: Routes = [
      {
        path: '',
        redirectTo: 'menulist',
        pathMatch: 'full'
      }
      ,
      {
        path: 'menulist',
        loadChildren: () => import('../menulist/menulist.module').then(m => m.MenulistPageModule),

      },
      {
        path: 'history',
        loadChildren: () => import('../history/history.module').then(m => m.HistoryPageModule),

      },
      {
        path: 'favourite',
        loadChildren: () => import('../favourite/favourite.module').then(m => m.FavouritePageModule),

      },
      {
        path: 'notification',
        loadChildren: () => import('../notification/notification.module').then(m => m.NotificationPageModule) ,

      },
      {
        path: 'feedback',
        loadChildren: () => import('../feedback/feedback.module').then(m => m.FeedbackPageModule) ,
      }, 
      {
        path: 'download',
        loadChildren: () => import('../download/download.module').then(m => m.DownloadPageModule) ,
      }, 
      {
        path: 'aboutus',
        loadChildren: () => import('../aboutus/aboutus.module').then(m => m.AboutusPageModule) ,

      } 

    ]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    DownloadfilterPageModule,
    DownloadchapterfilterPageModule,
    DownloadsubchapterfilterPageModule
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
