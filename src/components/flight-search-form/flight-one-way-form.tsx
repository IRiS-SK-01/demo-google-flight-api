import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import HorizontalDashedDivider from "./horizontal-dashed-divider";
import SearchFlightsButton from "./search-flights-button";
import type { OnSubmitSearchForm } from "../../types/flight";

type Props = {
    onSubmit: OnSubmitSearchForm;
};

const FlightOneWayFormContent: React.FC<Props> = ({ onSubmit }) => {
    const [departureAirport, setDepartureAirport] = useState('LOND');
    const [arrivalAirport, setArrivalAirport] = useState('NYC');

    const [departureDate, setDepartureDate] = useState(new Date().toISOString().split('T')[0]);

    const { t } = useTranslation();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const queryParams = new URLSearchParams({
            ...(departureAirport && { origin: departureAirport }),
            ...(arrivalAirport && { destination: arrivalAirport }),
            ...(departureDate && { date: departureDate }),
        });

        onSubmit(queryParams);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        label={t('departure-airport')}
                        value={departureAirport} required
                        onChange={(e) => setDepartureAirport(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        label={t('arrival-airport')}
                        value={arrivalAirport} required
                        onChange={(e) => setArrivalAirport(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        label={t('departure-date')}
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={departureDate} required
                        onChange={(e) => setDepartureDate(e.target.value)}
                    />
                </Grid>
            </Grid>
            <HorizontalDashedDivider />
            <Grid  >
                <SearchFlightsButton />
            </Grid>
        </form>
    );
};

export default FlightOneWayFormContent;