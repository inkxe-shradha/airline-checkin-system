export interface Passenger {
    id?: number | string;
    checkedIn?: boolean,
    isWheelChair: boolean;
    isInfant: boolean;
    isSpecialMeal: boolean;
    name: string;
    passport: string;
    dob: string;
    flight: string;
    seat: string;
    createdAt?: number;
    address: string;
    addedAncillaryServices?: Array<string>;
}

export interface PassengerFilter {
    isPassport: boolean;
    isDob: boolean;
    isAddress: boolean;
}

