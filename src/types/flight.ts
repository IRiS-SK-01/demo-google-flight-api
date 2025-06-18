export enum SortOption {
    PRICE = 'price',
    DURATION = 'duration',
}

export enum FilterOption {
    AIRLINE = 'airline',
    DIRECT = 'direct',
}

export enum TripType {
    ROUND_TRIP = 'round-trip',
    ONE_WAY = 'one-way',
    MULTI_CITY = 'multi-city',
}

export enum CabinClass {
    ECONOMY = 'Economy',
    PREMIUM_ECONOMY = 'Premium Economy',
    BUSINESS = 'Business',
    FIRST = 'First',
}

export type UiFlightLeg = {
    departureAirport: string;
    arrivalAirport: string;
    departureDate: string;
};

export type OnSubmitSearchForm = (legsQueryParam: URLSearchParams) => void;