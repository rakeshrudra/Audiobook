import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZakatPayPage } from './zakat-pay.page';

const routes: Routes = [
  {
    path: '',
    component: ZakatPayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZakatPayPageRoutingModule {}
