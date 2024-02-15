import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HappyTimerPage } from './happy-timer.page';

const routes: Routes = [
  {
    path: '',
    component: HappyTimerPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HappyTimerPageRoutingModule {}
