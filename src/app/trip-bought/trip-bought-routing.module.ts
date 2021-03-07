import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TripBoughtPage } from './trip-bought.page';

const routes: Routes = [
  {
    path: '',
    component: TripBoughtPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripBoughtPageRoutingModule {}
