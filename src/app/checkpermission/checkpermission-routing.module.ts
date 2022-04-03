import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckpermissionPage } from './checkpermission.page';

const routes: Routes = [
  {
    path: '',
    component: CheckpermissionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckpermissionPageRoutingModule {}
