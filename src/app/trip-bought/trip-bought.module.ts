import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TripBoughtPageRoutingModule } from './trip-bought-routing.module';

import { TripBoughtPage } from './trip-bought.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TripBoughtPageRoutingModule
  ],
  declarations: [TripBoughtPage]
})
export class TripBoughtPageModule {}
