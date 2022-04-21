import { Passenger } from 'src/app/core/models/passenger.model';
import { createAction, props } from "@ngrx/store";

export const loadPassengerList = createAction('[Passenger] Load Passenger List');

export const onLoadedPassengerList = createAction('[Passenger] On Loaded Passenger List', props<{ passengerList: Passenger[] }>());

export const deletePassengerList = createAction('[Passenger] Delete', props<{ id: string | number }>())

export const deletePassengerSuccess = createAction('[Passenger] Delete Success', props<{ id: string | number }>());

export const addPassengerList = createAction('[Passenger] Add', props<Passenger>())

export const savePassengerList = createAction('[Passenger] Save', props<Passenger>());

export const updatePassengerList = createAction('[Passenger] Update', props<Passenger>());
export const updatePassengerListOnSuccess = createAction('[Passenger] update list success', props<Passenger>());

export const handelPassengerError = createAction('[Passenger] Error', props<{ errorState: string }>())