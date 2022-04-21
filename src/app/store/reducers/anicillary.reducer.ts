import { createReducer, on } from "@ngrx/store";
import { anicillaryListLoaded, removeAnicillaryListSuccess, saveAnicillaryListOnSuccess, updateAnicillaryListSuccess } from "../actions/anicillary.action";
import { AnicillaryState } from "../states/anicillary.state";

const initialState: AnicillaryState = {
    anicillaryList: [],
    errorState: undefined
}


export const anicillaryReducer = createReducer(initialState,
    on(anicillaryListLoaded, (state, action) => {
        return {
            ...state,
            anicillaryList: action.anicillaryList,
            errorState: undefined
        }
    }),
    on(saveAnicillaryListOnSuccess, (state, action) => {
        console.log(action);

        return {
            ...state,
            anicillaryList: [...state.anicillaryList, action.anicillaryList],
            errorState: undefined
        }
    }),
    on(updateAnicillaryListSuccess, (state, { anicillaryList }) => {
        const updatedAnicillaryList = state.anicillaryList.map(ele => {
            if (Number(ele.id) === Number(anicillaryList.id)) {
                return anicillaryList;
            }
            return ele;
        });

        return {
            ...state,
            anicillaryList: updatedAnicillaryList,
            errorState: undefined
        }
    }),

    on(removeAnicillaryListSuccess, (state, action) => {
        return {
            ...state,
            anicillaryList: state.anicillaryList.filter(ele => Number(ele.id) !== Number(action.id)),
            errorState: undefined
        }
    })
);