import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrayersettingPage } from './prayersetting.page';

const routes: Routes = [
  {
    path: '',
    component: PrayersettingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrayersettingPageRoutingModule {}
