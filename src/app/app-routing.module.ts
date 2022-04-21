import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'passenger-list',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/passenger-list/passenger-list.module').then(m => m.PassengerListModule),
    data: {
      roles: 'admin'
    }
  },
  {
    path: 'ancillary-list',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/anicillary/anicillary.module').then(m => m.AnicillaryModule),
    data: {
      roles: 'admin'
    }
  },
  {
    path: 'checked-in',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/checkin/checkin.module').then(m => m.CheckinModule),
  },
  {
    path: 'in-flight',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/in-flight/in-flight.module').then(m => m.InFlightModule),
  },
  // 404 page
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
