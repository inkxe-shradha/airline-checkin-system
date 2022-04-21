import { createReducer, on } from '@ngrx/store';
import { finishLoading, startLoading } from '../actions/loading.action';

export interface LoadingState {
    isLoading: boolean;
};

const initialState: LoadingState = {
    isLoading: false,
};

export const loadingReducer = createReducer(
    initialState,
    on(
        startLoading,
        (state) => ({ ...state, isLoading: true }),
    ),
    on(
        finishLoading,
        (state) => ({ ...state, isLoading: false }),
    )
);