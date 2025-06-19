
export type AirportCoord = {
    code: string;
    coordinates: [number, number] | null; // [longitude, latitude]
};

export type AirportCoordsLeg = {
    from: AirportCoord;
    to: AirportCoord;
};