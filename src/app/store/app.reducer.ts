import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./app.state";
import { anicillaryReducer } from "./reducers/anicillary.reducer";
import { authReducer } from "./reducers/auth.reducer";
import { loadingReducer } from "./reducers/loading.reducer";
import { passengerReducer } from "./reducers/passenger.reducer";

export const appReducer: ActionReducerMap<AppState> = {
    auth: authReducer,
    loading: loadingReducer,
    passengerList: passengerReducer,
    anicillaryList: anicillaryReducer
}