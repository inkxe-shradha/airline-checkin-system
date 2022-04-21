import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckinRoutingModule } from './checkin-routing.module';
import { CheckinComponent } from './checkin.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CheckinComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CheckinRoutingModule
  ]
})
export class CheckinModule { }
