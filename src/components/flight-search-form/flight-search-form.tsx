import { Box, Button, Card, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FlightMap } from '../flight-map';
import airportsData from 'airport-data/airports.json';
import { CabinClass, TripType } from '../../types/flight';
import { TripTypeSelector } from './trip-type-selector';
import HorizontalDashedDivider from './horizontal-dashed-divider';
import MultiCityLegRow from './multi-city-leg-row';
import TripFormFactory from './flight-form-factory';

export default function FlightSearchForm() {

    const [departureAirport, setDepartureAirport] = useState('');
    const [arrivalAirport, setArrivalAirport] = useState('');

    const [departureAirportCoord, setDepartureAirportCoord] = useState<[number, number] | null>(null);
    const [arrivalAirportCoord, setArrivalAirportCoord] = useState<[number, number] | null>(null);

    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');

    const [legs, setLegs] = useState<_FlightLeg[]>([
        { departureAirport: '', arrivalAirport: '', departureDate: '' },
    ]);

    const [tripType, setTripType] = useState<TripType>(TripType.ONE_WAY);

    const [cabinClass, setCabinClass] = useState<CabinClass>(CabinClass.ECONOMY);
    const [adultsCount, setAdultsCount] = useState<number>(1);
    const [childrenCount, setChildrenCount] = useState<number>(0);
    const [infantsCount, setInfantsCount] = useState<number>(0);

    const navigate = useNavigate();

    const { t } = useTranslation();


    const _addFlightLeg = () => {
        setLegs((prev) => [...prev, { departureAirport: '', arrivalAirport: '', departureDate: '' }]);
    }

    const _removeLeg = (indexToRemove: number) => {
        setLegs((prev) => prev.filter((_, index) => index !== indexToRemove));
    };

    const _updateLeg = (index: number, key: keyof _FlightLeg, value: string) => {
        setLegs((prev) =>
            prev.map((leg, i) => (i === index ? { ...leg, [key]: value } : leg))
        );
    };

    useEffect(() => {
        if (!departureAirport || departureAirport.length !== 3) {
            setDepartureAirportCoord(null);
            return;
        }

        const airport = airportsData.find(
            (a) => a.iata?.toUpperCase() === departureAirport.toUpperCase()
        );

        if (airport) {
            setDepartureAirportCoord([airport.longitude, airport.latitude]);
        } else {
            setDepartureAirportCoord(null);
        }
    }, [departureAirport]);

    useEffect(() => {
        if (!arrivalAirport || arrivalAirport.length !== 3) {
            setArrivalAirportCoord(null);
            return;
        }

        const airport = airportsData.find(
            (a) => a.iata?.toUpperCase() === arrivalAirport.toUpperCase()
        );

        setArrivalAirportCoord(
            airport ? [airport.longitude, airport.latitude] : null
        );
    }, [arrivalAirport]);

    const handleSubmit = (legsQueryParams: URLSearchParams) => {

        const queryParams = new URLSearchParams(legsQueryParams);

        if (cabinClass) {
            queryParams.set('cabinClass', cabinClass);
        }
        if (adultsCount !== undefined) {
            queryParams.set('adults', String(adultsCount));
        }
        if (childrenCount !== undefined) {
            queryParams.set('children', String(childrenCount));
        }
        if (infantsCount !== undefined) {
            queryParams.set('infants', String(infantsCount));
        }

        navigate(`/results?${queryParams.toString()}`);
    };

    return (
        <>
            <TripTypeSelector value={tripType} onChange={setTripType} />

            <Card sx={{ p: 2, maxWidth: 1,
                maxHeight: '60vh',
                overflow: 'scroll',
                mx: 'auto', bgcolor: '#fbfbfb' }}>

                {/* Passenger Info */}
                <Grid container xs={12} sm={6} spacing={2}>
                    <FormControl>
                        <InputLabel>{t('cabin-class')}</InputLabel>
                        <Select
                            value={cabinClass}
                            onChange={(e) => setCabinClass(e.target.value as CabinClass)}
                        >
                            {Object.values(CabinClass).map((value) => (
                                <MenuItem key={value} value={value}>
                                    {t(`cabin-class-type.${value.toLocaleLowerCase()}`)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label={t('adults-input-label')}
                            type="number"
                            inputProps={{ min: 1 }}
                            value={adultsCount}
                            onChange={(e) => setAdultsCount(+e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label={t('children-input-label')}
                            type="number"
                            inputProps={{ min: 0 }}
                            value={childrenCount}
                            onChange={(e) => setChildrenCount(+e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label={t('infants-input-label')}
                            type="number"
                            inputProps={{ min: 0 }}
                            value={infantsCount}
                            onChange={(e) => setInfantsCount(+e.target.value)}
                            fullWidth
                        />
                    </Grid>
                </Grid>


                <HorizontalDashedDivider />
                {/* <Fragmet> */}

                {/* </Fragmet> */}
                <TripFormFactory tripType={tripType} onSubmit={handleSubmit} />

                {/* Passenger Info */}

            </Card>
        </>
    );
};
