import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InFlightRoutingModule } from './in-flight-routing.module';
import { InFlightComponent } from './in-flight.component';


@NgModule({
  declarations: [
    InFlightComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    InFlightRoutingModule
  ]
})
export class InFlightModule { }
