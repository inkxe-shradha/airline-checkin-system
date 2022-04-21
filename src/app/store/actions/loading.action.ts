import { createAction } from "@ngrx/store";

export const startLoading = createAction("[Loading] Start");

export const finishLoading = createAction("[Loading] Finish");