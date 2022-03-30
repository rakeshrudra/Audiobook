import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AudioContentPage } from './audio-content.page';

const routes: Routes = [
  {
    path: '',
    component: AudioContentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AudioContentPageRoutingModule {}
