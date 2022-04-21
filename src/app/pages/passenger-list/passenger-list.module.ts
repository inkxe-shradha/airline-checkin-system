import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PassengerListRoutingModule } from './passenger-list-routing.module';
import { PassengerListComponent } from './passenger-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditPassengerFormComponent } from 'src/app/components/add-edit-passenger-form/add-edit-passenger-form.component';


@NgModule({
  declarations: [
    PassengerListComponent,
    AddEditPassengerFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PassengerListRoutingModule
  ]
})
export class PassengerListModule { }
