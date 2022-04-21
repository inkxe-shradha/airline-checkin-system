import { AnicillaryList } from "src/app/core/models/anicillary.model";

export interface AnicillaryState {
    anicillaryList: AnicillaryList[];
    selectedFlight?: string
    errorState?: string | undefined;
}