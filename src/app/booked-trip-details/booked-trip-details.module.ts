import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookedTripDetailsPageRoutingModule } from './booked-trip-details-routing.module';

import { BookedTripDetailsPage } from './booked-trip-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookedTripDetailsPageRoutingModule
  ],
  declarations: [BookedTripDetailsPage]
})
export class BookedTripDetailsPageModule {}
