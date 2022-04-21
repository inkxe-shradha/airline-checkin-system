import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, switchMap, tap, of } from "rxjs";
import { User } from "src/app/core/models/user";
import { AuthService } from "src/app/pages/auth/auth.service";
import { autoLogin, logOut, signInError, signInStart, signInSuccess } from "../actions/auth.action";
import { finishLoading, startLoading } from "../actions/loading.action";
import { AppState } from "../app.state";

@Injectable()
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private router: Router,
        private store: Store<AppState>
    ) {
    }

    signIn$ = createEffect(() => this.actions$.pipe(
        ofType(signInStart),
        tap(() => this.store.dispatch(startLoading())),
        switchMap(({ email, password, isFromGoogle }) => {
            const emailStatic = email.split("@")[0];
            let loggedId = null;
            if (emailStatic === "admin") {
                loggedId = 1;
            } else {
                loggedId = 2;
            }
            return this.authService.signIn(loggedId).pipe(
                map((res) => {
                    this.store.dispatch(finishLoading());
                    if (
                        (res.email === email &&
                            res.password === password) ||
                        (isFromGoogle && email)
                    ) {
                        const formattedResponse = isFromGoogle ? { ...res, email: res.email, name: password } : res;
                        localStorage.setItem("user", JSON.stringify(formattedResponse));
                        return signInSuccess(formattedResponse);
                    }
                    return signInError({ errorState: "Invalid credentials" });
                }),
                catchError(() => of(signInError({ errorState: "Invalid Credentials" })))
            );
        })
    ))

    authSuccess$ = createEffect(() => this.actions$.pipe(ofType(signInSuccess), tap(action => {
        // Get Current Path
        const path = window.location.pathname;
        if (path === "/" || path === "/sign-in") {
            this.router.navigate(["/"]);
        }
    })), { dispatch: false });


    authLogin$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(autoLogin),
            map(() => {
                const userData: User = JSON.parse(localStorage.getItem('user') || "null");
                if (userData) {
                    localStorage.setItem('user', JSON.stringify(userData));
                    return signInSuccess({ ...userData });
                }
                return {
                    type: 'in-valid',
                }
            })
        );
    });

    authLogout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(logOut),
            tap(() => {
                localStorage.removeItem('user');
                this.router.navigateByUrl('/sign-in');
            })
        );
    }, {
        dispatch: false
    });
}