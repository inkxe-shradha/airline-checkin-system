import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { AppState } from 'src/app/store';
import { getAuthenticatedUser } from 'src/app/store/selectors/auth.selector';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(getAuthenticatedUser).pipe(
      map((user: User | null) => {
        if (user?.name) {
          const currentAccess = user?.isAdmin ? 'admin' : 'user';
          if (route.data?.['roles'] && route.data?.['roles'].indexOf(currentAccess) === -1) {
            this.router.navigate(['/']);
            return false;
          }
          return true;
        }
        return this.router.createUrlTree(['/sign-in']);
      })
    )
  }

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }
}
