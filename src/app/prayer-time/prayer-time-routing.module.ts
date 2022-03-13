import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrayerTimePage } from './prayer-time.page';

const routes: Routes = [
  {
    path: '',
    component: PrayerTimePage
  },
  {
    path: 'prayersetting',
    loadChildren: () => import('../prayerTime/prayersetting/prayersetting.module').then( m => m.PrayersettingPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrayerTimePageRoutingModule {}
