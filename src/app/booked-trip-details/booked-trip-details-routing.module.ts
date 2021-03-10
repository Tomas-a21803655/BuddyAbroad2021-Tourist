import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookedTripDetailsPage } from './booked-trip-details.page';

const routes: Routes = [
  {
    path: '',
    component: BookedTripDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookedTripDetailsPageRoutingModule {}
