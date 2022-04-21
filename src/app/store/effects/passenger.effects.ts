import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { PassengerService } from "src/app/pages/passenger-list/passenger.service";
import { finishLoading, startLoading } from "../actions/loading.action";
import { addPassengerList, deletePassengerList, deletePassengerSuccess, handelPassengerError, loadPassengerList, onLoadedPassengerList, savePassengerList, updatePassengerList, updatePassengerListOnSuccess } from "../actions/passenger.action";
import { AppState } from "../app.state";
import { catchError, map, switchMap, tap, of } from "rxjs";

@Injectable()
export class PassengerEffect {
    constructor(
        private actions$: Actions,
        private passengerService: PassengerService,
        private store: Store<AppState>
    ) {
    }
    loadUser$ = createEffect(() => this.actions$.pipe(
        ofType(loadPassengerList),
        tap(() => this.store.dispatch(startLoading())),
        switchMap(() => {
            return this.passengerService.getPassengerList().pipe(
                map((res) => {
                    this.store.dispatch(finishLoading());
                    return onLoadedPassengerList({
                        passengerList: res
                    });
                }),
                catchError(() => {
                    this.store.dispatch(finishLoading());
                    return of(handelPassengerError({ errorState: "Error while loading passenger list" }));
                })
            )
        })
    ))

    saveNewPassengerList$ = createEffect(() => this.actions$.pipe(
        ofType(addPassengerList),
        tap(() => this.store.dispatch(startLoading())),
        switchMap((action) => {
            return this.passengerService.savePassenger(action).pipe(
                map((res) => {
                    this.store.dispatch(finishLoading());
                    return savePassengerList(res);
                }),
                catchError(() => {
                    this.store.dispatch(finishLoading());
                    return of(handelPassengerError({ errorState: "Error while saving passenger" }));
                })
            )
        })
    ))

    updatePassengerList$ = createEffect(() => this.actions$.pipe(
        ofType(updatePassengerList),
        tap(() => this.store.dispatch(startLoading())),
        switchMap((action) => {

            return this.passengerService.updatePassenger(action).pipe(
                map((res) => {
                    this.store.dispatch(finishLoading());
                    return updatePassengerListOnSuccess(res);
                }),
                catchError(() => {
                    this.store.dispatch(finishLoading());
                    return of(handelPassengerError({ errorState: "Error while updating passenger" }));
                })
            )
        })
    ))


    // Remove Passenger from
    deletePassenger$ = createEffect(() => this.actions$.pipe(
        ofType(deletePassengerList),
        tap(() => this.store.dispatch(startLoading())),
        switchMap((action) => {
            return this.passengerService.deletePassenger(action.id).pipe(
                map((res) => {
                    this.store.dispatch(finishLoading());
                    return deletePassengerSuccess({
                        id: action.id
                    });
                }),
                catchError(() => {
                    this.store.dispatch(finishLoading());
                    return of(handelPassengerError({ errorState: "Error while deleting passenger" }));
                })
            )
        })
    ))

}