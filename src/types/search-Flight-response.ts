export interface SearchFlightResponse {
    status: boolean;
    timestamp: number;
    sessionId: string;
    data: {
        context: {
            status: string;
            totalResults: number;
        };
        itineraries: Itinerary[];
    };
}

export interface Itinerary {
    id: string;
    price: {
        raw: number;
        formatted: string;
    };
    legs: Leg[];
    isSelfTransfer: boolean;
    isProtectedSelfTransfer: boolean;
    farePolicy: {
        isChangeAllowed: boolean;
        isPartiallyChangeable: boolean;
        isCancellationAllowed: boolean;
        isPartiallyRefundable: boolean;
    };
    eco?: {
        ecoContenderDelta: number;
    };
    tags: string[];
    isMashUp: boolean;
    hasFlexibleOptions: boolean;
    score: number;
}

export interface Leg {
    id: string;
    origin: Place;
    destination: Place;
    durationInMinutes: number;
    stopCount: number;
    isSmallestStops: boolean;
    departure: string;
    arrival: string;
    timeDeltaInDays: number;
    carriers: {
        marketing: Carrier[];
        operationType: string;
    };
    segments: Segment[];
}

export interface Segment {
    id: string;
    origin: FlightPlace;
    destination: FlightPlace;
    departure: string;
    arrival: string;
    durationInMinutes: number;
    flightNumber: string;
    marketingCarrier: Carrier;
    operatingCarrier: Carrier;
}

export interface Place {
    toUpperCase(): unknown;
    longitude: number;
    latitude: number;
    id: string;
    name: string;
    displayCode: string;
    city: string;
    isHighlighted: boolean;
}

export interface FlightPlace {
    flightPlaceId: string;
    displayCode: string;
    name: string;
    type: string;
    parent: {
        flightPlaceId: string;
        displayCode: string;
        name: string;
        type: string;
    };
}

export interface Carrier {
    id: number;
    name: string;
    alternateId: string;
    allianceId: number;
    logoUrl?: string;
}
