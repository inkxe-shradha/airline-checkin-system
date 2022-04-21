import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PassengerState } from "../states/passenger.state";

const selectedFeature = createFeatureSelector<PassengerState>('passengerList');

export const getAllPassengerList = ({ flightId, filter: { isPassport, isDob, isAddress } = {
    isPassport: false,
    isDob: false,
    isAddress: false
} }: { flightId: string | undefined, filter: { isPassport: boolean, isDob: boolean, isAddress: boolean } }) => createSelector(selectedFeature, ((state: PassengerState) => {

    const currentState = state.passengerList;

    const filterState = flightId ? currentState.filter((ele) => {
        if (ele.flight !== flightId) {
            return false;
        }
        if (
            (isPassport && !ele.passport) ||
            (isDob && !ele.dob) ||
            (isAddress && !ele.address)
        ) {

            return ele;
        } else if (!isPassport && !isDob && !isAddress) {
            return ele;
        }
        return null;
    }) : currentState;
    return filterState
}));

export const handelPassengerError = createSelector(selectedFeature, (state: PassengerState) => state.errorState);

export const getSingleUserDetails = (id: string | number) => createSelector(selectedFeature, ((state: PassengerState) => {
    const currentState = state.passengerList;
    const getSingleUser = currentState.find(ele => ele.id === id);
    return getSingleUser;
}));

