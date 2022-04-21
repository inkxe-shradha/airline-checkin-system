import { createAction, props } from "@ngrx/store";
import { User } from "src/app/core/models/user";

export const signInSuccess = createAction("[Auth] Sign In", props<User>());

export const signInStart = createAction("[Auth] Sign In Start", props<{ email: string, password: string, isFromGoogle?: boolean }>());

export const signInError = createAction("[Auth] Sign In Error", props<{ errorState: string }>());

export const autoLogin = createAction("[Auth] Login");

export const logOut = createAction("[Auth] Log Out");