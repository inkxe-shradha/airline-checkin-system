import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnicillaryRoutingModule } from './anicillary-routing.module';
import { AnicillaryListComponent } from './anicillary-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditAnicillaryComponent } from 'src/app/components/add-edit-anicillary/add-edit-anicillary.component';


@NgModule({
  declarations: [
    AnicillaryListComponent,
    AddEditAnicillaryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AnicillaryRoutingModule
  ]
})
export class AnicillaryModule { }
