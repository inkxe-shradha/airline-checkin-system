import { LoadingState } from "./reducers/loading.reducer";
import { AnicillaryState } from "./states/anicillary.state";
import { AuthState } from "./states/auth.state";
import { PassengerState } from "./states/passenger.state";

export interface AppState {
    auth: AuthState;
    loading: LoadingState,
    passengerList: PassengerState,
    anicillaryList: AnicillaryState
}