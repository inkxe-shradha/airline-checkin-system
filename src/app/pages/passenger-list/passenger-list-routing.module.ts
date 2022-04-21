import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PassengerListComponent } from './passenger-list.component';

const routes: Routes = [
  { path: '', component: PassengerListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassengerListRoutingModule { }
