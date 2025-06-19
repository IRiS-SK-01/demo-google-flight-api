
import airports from 'airport-data/airports.json';
import type { Leg } from '../types/search-Flight-response';
import type { AirportCoordsLeg } from '../types/flight-map';

export function prepareLegsWithCoordinates(legs: Leg[]): AirportCoordsLeg[] {
    return legs.map(({ origin, destination }) => {
        const fromData = airports.find(
            (a) => a.iata?.toUpperCase() === origin.displayCode.toUpperCase()
        );

        const toData = airports.find(
            (a) => a.iata?.toUpperCase() === destination.displayCode.toUpperCase()
        );

        return {
            from: {
                code: origin.displayCode,
                coordinates: fromData ? [fromData.longitude, fromData.latitude] : null,
            },
            to: {
                code: destination.displayCode,
                coordinates: toData ? [toData.longitude, toData.latitude] : null,
            },
        };
    });
}