import { AuthState } from "../states/auth.state";
import { createReducer, on } from '@ngrx/store';
import { signInSuccess, signInStart, signInError, logOut } from "../actions/auth.action";

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    errorState: undefined,
    token: undefined
}


export const authReducer = createReducer(
    initialState,
    on(
        signInSuccess,
        (state, action) => ({ ...state, isAuthenticated: true, user: action, errorState: undefined }),
    ),
    on(signInStart, (state, action) => ({
        ...state,
        isAuthenticated: false,
        user: null,
        errorState: undefined
    })),
    on(signInError, (state, action) => ({
        ...state,
        isAuthenticated: false,
        user: null,
        errorState: action.errorState
    })),

    on(logOut, (state) => ({
        ...state,
        isAuthenticated: false,
        user: null,
        errorState: undefined
    })),
);