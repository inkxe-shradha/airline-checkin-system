import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../states/auth.state";


const selectedFeatures = createFeatureSelector<AuthState>('auth');

export const getAuthenticatedUser = createSelector(
    selectedFeatures,
    (state: AuthState) => state.user
);

export const isAuthenticated = createSelector(selectedFeatures, (state: AuthState) => state.isAuthenticated);

export const getAuthError = createSelector(selectedFeatures, (state: AuthState) => state.errorState);
