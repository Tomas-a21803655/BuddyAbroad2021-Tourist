import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanVisitPageRoutingModule } from './plan-visit-routing.module';

import { PlanVisitPage } from './plan-visit.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PlanVisitPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [PlanVisitPage]
})
export class PlanVisitPageModule {}
