import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckpermissionPageRoutingModule } from './checkpermission-routing.module';

import { CheckpermissionPage } from './checkpermission.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckpermissionPageRoutingModule
  ],
  declarations: [CheckpermissionPage]
})
export class CheckpermissionPageModule {}
