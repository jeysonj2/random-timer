import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HappyTimerPage } from './happy-timer.page';

import { HappyTimerPageRoutingModule } from './happy-timer-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HappyTimerPageRoutingModule
  ],
  declarations: [HappyTimerPage]
})
export class HappyTimerPageModule {}
