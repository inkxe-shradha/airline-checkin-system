import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  SocialAuthService,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { Observable } from 'rxjs';
import { FormValidationErrorHandler } from 'src/app/shared/utils/formValidationError';
import { AppState } from 'src/app/store';
import { autoLogin, signInStart } from 'src/app/store/actions/auth.action';
import { getAuthError } from 'src/app/store/selectors/auth.selector';
import { getCurrentLoadingState } from 'src/app/store/selectors/loading.selector';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  public errorHandler = new FormValidationErrorHandler();
  public dataLoading!: Observable<boolean>;
  public errorState!: Observable<string | undefined>;
  @ViewChild('form') signInForm!: NgForm;
  constructor(
    private socialAuthService: SocialAuthService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      if (user?.email) {
        // this.store.dispatch(autoLogin({ user }));
        const { email, name } = user;
        this.store.dispatch(signInStart({ email, password: name, isFromGoogle: true }));
      }
    });
    this.store.dispatch(autoLogin());
    this.dataLoading = this.store.select(getCurrentLoadingState);
    this.errorState = this.store.select(getAuthError);
  }


  onLogin(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    console.log(this.signInForm);

    const { email, password } = form.value;
    this.store.dispatch(signInStart({ email, password, isFromGoogle: false }));
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
