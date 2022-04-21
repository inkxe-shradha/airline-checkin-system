import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnicillaryListComponent } from './anicillary-list.component';

const routes: Routes = [
  {
    path: '',
    component: AnicillaryListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnicillaryRoutingModule { }
