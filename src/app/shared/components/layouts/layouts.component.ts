import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { getAuthenticatedUser, isAuthenticated } from 'src/app/store/selectors/auth.selector';
import { User } from 'src/app/core/models/user';
import { logOut } from 'src/app/store/actions/auth.action';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  public isUserAuthenticated!: Observable<boolean>;
  public userDetails!: Observable<User | null>;
  constructor(private breakpointObserver: BreakpointObserver, private store: Store,
    private socialAuthService: SocialAuthService,
  ) { }
  ngOnInit(): void {
    this.userDetails = this.store.select(getAuthenticatedUser);
    this.isUserAuthenticated = this.store.select(isAuthenticated);
  }

  handelLogout(): void {
    this.socialAuthService.signOut().then(() => {
      this.logOut();
    }).catch(err => {
      this.logOut()
      console.log(err);
    });
  }

  logOut(): void {
    this.store.dispatch(logOut());
  }

}
