// src/pages/SearchResults.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchFlights } from '../../services/flight-services';
import { Card, Container, Skeleton, Stack } from '@mui/material';
import type { Itinerary } from '../../types/search-Flight-response';
import { FlightCard } from '../flight-card/flight-card';
import Grid from '@mui/material/Grid';
import { FlightFilters } from './flight-filters';
import { SortOption } from '../../types/flight';
import FlightDetailHero from '../flight-card/flight-detailed-hero';
import { AnimatePresence } from 'framer-motion';

const SearchResults: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [itineraries, setItineraries] = useState<Itinerary[]>([]);

    const [sort, setSort] = useState<SortOption>(SortOption.PRICE);

    const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);

    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');
    const date = searchParams.get('date');

    const [durationRange, setDurationRange] = useState<[number, number]>([0, 2000]);

    const [isLoading, setIsLoading] = useState(true);

    const [selectedItinerary, setSelectedItinerary] = useState<Itinerary | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        if (!origin || !destination || !date) return;

        searchFlights({ from: origin, to: destination, date: date }).then((itineraries) => {
            setIsLoading(!(itineraries?.length))
            setItineraries(itineraries);
        }).catch(console.error);
        console.log('Search:', { from: origin, to: destination, date: date });
        console.log(itineraries);
    }, [origin, destination, date]);


    const airlines = useMemo(() => {
        const all = itineraries.flatMap(i => i.legs.map(l => l.carriers.marketing[0]?.name));
        return Array.from(new Set(all)).filter(Boolean) as string[];
    }, [itineraries]);

    const filteredSorted = useMemo(() => {
        let result = [...itineraries];

        // Filter by selected airlines
        if (selectedAirlines.length) {
            result = result.filter(i =>
                i.legs.some(l => selectedAirlines.includes(l.carriers.marketing[0]?.name || ''))
            );
        }

        // Filter by duration range
        result = result.filter(i => {
            const totalDuration = i.legs.reduce((sum, l) => sum + l.durationInMinutes, 0);
            return totalDuration >= durationRange[0] && totalDuration <= durationRange[1];
        });

        // Sort by price or duration
        result.sort((a, b) => {
            if (sort === SortOption.PRICE) {
                return a.price.raw - b.price.raw;
            } else {
                const durA = a.legs.reduce((sum, l) => sum + l.durationInMinutes, 0);
                const durB = b.legs.reduce((sum, l) => sum + l.durationInMinutes, 0);
                return durA - durB;
            }
        });

        return result;
    }, [itineraries, selectedAirlines, sort, durationRange]);

    const handleCardClick = (itinerary: Itinerary) => {
        setSelectedItinerary(itinerary);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedItinerary(null);
    };

    return (
        <Card>
            <Stack sx={{ p: 2, }}>
                <FlightFilters
                    sort={sort}
                    setSort={setSort}
                    airlines={airlines}
                    durationRange={durationRange}
                    setDurationRange={setDurationRange}
                    selectedAirlines={selectedAirlines}
                    setSelectedAirlines={setSelectedAirlines}
                />
                <Container maxWidth="lg" sx={{ py: 4, }} >
                    <Grid container spacing={3}>
                        {isLoading && (
                            <>
                                {[...Array(3)].map((_, i) => (
                                    <Skeleton key={i} height={200} width={'20vw'} animation="wave" sx={{ borderRadius: 2 }}></Skeleton>
                                ))}
                            </>
                        )}
                        {filteredSorted.map((itinerary) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4, }} key={itinerary.id}>
                                <FlightCard itinerary={itinerary} onClick={() => handleCardClick(itinerary)} />
                            </Grid>
                        ))}
                    </Grid>

                    <AnimatePresence>
                        <FlightDetailHero
                            open={modalOpen}
                            onClose={handleCloseModal}
                            itinerary={selectedItinerary}
                        />
                    </AnimatePresence>
                </Container>
            </Stack>
        </Card>
    );
};

export default SearchResults;
