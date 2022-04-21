import { Injectable } from "@angular/core";
import { removeAnicillaryList, removeAnicillaryListSuccess } from 'src/app/store/actions/anicillary.action';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { AnicillaryService } from "src/app/pages/anicillary/anicillary.service";
import { anicillaryListLoaded, handelAnicillaryError, loadAnicillaryList, saveAnicillaryList, saveAnicillaryListOnSuccess, updateAnicillaryList, updateAnicillaryListSuccess } from "../actions/anicillary.action";
import { AppState } from "../app.state";
import { catchError, map, switchMap, tap, of } from "rxjs";
import { finishLoading, startLoading } from "../actions/loading.action";


@Injectable()
export class AnicillaryEffects {
    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private AnicillaryService: AnicillaryService
    ) { }

    loadAnicillaryList$ = createEffect(() => this.actions$.pipe(
        ofType(loadAnicillaryList),
        tap(() => this.store.dispatch(startLoading())),
        switchMap(() => {
            return this.AnicillaryService.getAnicillaryList().pipe(
                map((res) => {
                    this.store.dispatch(finishLoading());
                    return anicillaryListLoaded({
                        anicillaryList: res
                    });
                }),
                catchError(() => {
                    this.store.dispatch(finishLoading());
                    return of(handelAnicillaryError({ errorState: "Error while loading anicillary list" }));
                })
            )
        })
    ))

    saveAnicillaryList$ = createEffect(() => this.actions$.pipe(
        ofType(saveAnicillaryList),
        tap(() => this.store.dispatch(startLoading())),
        switchMap((action) => {
            return this.AnicillaryService.saveAnicillaryList(action.anicillaryList).pipe(
                map((res) => {
                    this.store.dispatch(finishLoading());
                    return saveAnicillaryListOnSuccess({
                        anicillaryList: res
                    });
                }),
                catchError(() => {
                    this.store.dispatch(finishLoading());
                    return of(handelAnicillaryError({ errorState: "Error while saving anicillary" }));
                })
            )
        })
    ));


    updateAnicillaryList$ = createEffect(() => this.actions$.pipe(
        ofType(updateAnicillaryList),
        tap(() => this.store.dispatch(startLoading())),
        switchMap((action) => {
            return this.AnicillaryService.saveAnicillaryList(action.anicillaryList).pipe(
                map((res) => {
                    this.store.dispatch(finishLoading());
                    return updateAnicillaryListSuccess({
                        anicillaryList: res
                    });
                }),
                catchError(() => {
                    this.store.dispatch(finishLoading());
                    return of(handelAnicillaryError({ errorState: "Error while saving anicillary" }));
                })
            )
        })
    ));


    removeAnicillaryList$ = createEffect(() => this.actions$.pipe(
        ofType(removeAnicillaryList),
        tap(() => this.store.dispatch(startLoading())),
        switchMap((action) => {
            return this.AnicillaryService.removeAnicillaryList(action.id).pipe(
                map(() => {
                    this.store.dispatch(finishLoading());
                    return removeAnicillaryListSuccess({
                        id: action.id
                    });
                }),
                catchError(() => {
                    this.store.dispatch(finishLoading());
                    return of(handelAnicillaryError({ errorState: "Error while removing anicillary" }));
                })
            )
        })
    ));
}
