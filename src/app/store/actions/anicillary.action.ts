import { createAction, props } from "@ngrx/store";
import { AnicillaryList } from "src/app/core/models/anicillary.model";

export const loadAnicillaryList = createAction('[Anicillary] Load Anicillary List');

export const anicillaryListLoaded = createAction('[Anicillary] Load Anicillary List Success', props<{ anicillaryList: AnicillaryList[] }>());

export const saveAnicillaryList = createAction('[Save] Save Anicillary List', props<{ anicillaryList: AnicillaryList }>());

export const saveAnicillaryListOnSuccess = createAction('[Save] Save Anicillary List on success', props<{ anicillaryList: AnicillaryList }>());

export const updateAnicillaryList = createAction('[Update] Update Anicillary List', props<{ anicillaryList: AnicillaryList }>());

export const updateAnicillaryListSuccess = createAction('[Update] Update Anicillary List Success', props<{ anicillaryList: AnicillaryList }>());

export const removeAnicillaryList = createAction('[Remove] Remove Anicillary List', props<{ id: string | number }>());

export const removeAnicillaryListSuccess = createAction('[Remove] Remove Anicillary List Success', props<{ id: string | number }>());

export const handelAnicillaryError = createAction('[Anicillary] Error', props<{ errorState: string }>());