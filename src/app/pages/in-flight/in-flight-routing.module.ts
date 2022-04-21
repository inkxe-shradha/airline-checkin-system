import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InFlightComponent } from './in-flight.component';

const routes: Routes = [
  { path: '', component: InFlightComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InFlightRoutingModule { }
