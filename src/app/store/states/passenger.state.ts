import { Passenger, PassengerFilter } from "src/app/core/models/passenger.model";


export interface PassengerState {
    passengerList: Passenger[];
    mandatoryFields?: PassengerFilter,
    selectedFlight: string
    errorState?: string
}