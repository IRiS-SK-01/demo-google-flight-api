import { searchAirport } from './airport-service';

import mockedData from '../data/search-results.json';
import apiClient from '../utils/api-flight-client';
import type { Leg } from '../types/search-Flight-response';

export const searchFlights = async ({
    from,
    to,
    date,
    //   adults,
}: {
    from: string;
    to: string;
    date: string;
    //   adults: number;
}) => {
    try {
        const [originData, destinationData] = await Promise.all([
            searchAirport(from),
            searchAirport(to)
        ]);

        if (!originData.length || !destinationData.length || !date) return;

        const originSkyId = originData[0].skyId;
        const originEntityId = originData[0].entityId;

        const destinationSkyId = destinationData[0].skyId;
        const destinationEntityId = destinationData[0].entityId;

        const response = await apiClient.get('/searchFlights', {
            params: {
                originSkyId,
                originEntityId,
                destinationSkyId,
                destinationEntityId,
                date,
                // adults: adults.toString(),
            },
            headers: {
                'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY!,
                'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST!,
            },
        });

        return response.data.itineraries;
    } catch (error: any) {
        console.error('Flight search failed:', error.response?.data || error.message);
        return mockedData.data.itineraries;
    }
};

export const searchFlightsMultiStops = async (legs: Leg[]) => {
    const legsPayload = await prepareLegsPayload(legs);

    const response = await apiClient.post('/searchFlightsMultiStops', legsPayload);
    return response.data;
};

const prepareLegsPayload = async (legs: Leg[]) => {
    const legsWithEntities = await Promise.all(
        legs.map(async ({ origin, destination, departure }) => {
            const [originData, destinationData] = await Promise.all([
                searchAirport(origin.displayCode),
                searchAirport(destination.displayCode),
            ]);

            if (!originData.length || !destinationData.length || !departure) {
                throw new Error('Missing airport data or date for leg');
            }

            return {
                originEntityId: originData[0].entityId,
                destinationEntityId: destinationData[0].entityId,
                departure,
            };
        })
    );
    
    return legsWithEntities;
}