import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QublaLocationPage } from './qubla-location.page';

const routes: Routes = [
  {
    path: '',
    component: QublaLocationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QublaLocationPageRoutingModule {}
