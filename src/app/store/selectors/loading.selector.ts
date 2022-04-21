import { createFeatureSelector, createSelector } from "@ngrx/store";


const selectedFeature = createFeatureSelector<{ isLoading: boolean }>('loading');

export const getCurrentLoadingState = createSelector(selectedFeature, (state: { isLoading: boolean }) => state.isLoading);