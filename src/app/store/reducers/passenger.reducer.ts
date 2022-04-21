import { createReducer, on } from "@ngrx/store";
import { deletePassengerSuccess, onLoadedPassengerList, savePassengerList, updatePassengerList, updatePassengerListOnSuccess } from "../actions/passenger.action";
import { PassengerState } from "../states/passenger.state";


export const initialState: PassengerState = {
    passengerList: [],
    selectedFlight: '',
    mandatoryFields: {
        isPassport: false,
        isDob: false,
        isAddress: false
    },
    errorState: undefined
}

export const passengerReducer = createReducer(initialState,
    on(onLoadedPassengerList, (state, action) => {
        return {
            ...state,
            passengerList: action.passengerList,
            selectedFlight: '',
            mandatoryFields: initialState.mandatoryFields,
            errorState: undefined
        }
    }),

    on(savePassengerList, (state, action) => {
        console.log('add');

        return {
            ...state,
            passengerList: [...state.passengerList, action],
            errorState: undefined
        }
    }),

    on(deletePassengerSuccess, (state, action) => {
        return {
            ...state,
            passengerList: state.passengerList.filter(ele => Number(ele.id) !== Number(action.id)),
            errorState: undefined
        }
    }),

    on(updatePassengerListOnSuccess, (state, action) => {
        const updatedPassengerList = state.passengerList.map(ele => {
            if (ele.id === action.id) {
                return action;
            }
            return ele;
        });

        return {
            ...state,
            passengerList: updatedPassengerList,
            errorState: undefined
        }
    })

)