import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AnicillaryState } from "../states/anicillary.state";

const selectedFeature = createFeatureSelector<AnicillaryState>('anicillaryList');
export const getAllAnicillary = (selectedFlight: string) => createSelector(selectedFeature, ((state: AnicillaryState) => !selectedFlight ? state.anicillaryList : state.anicillaryList.filter(item => item.flight === selectedFlight)));