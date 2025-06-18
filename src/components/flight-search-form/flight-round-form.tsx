import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { Box, Grid, TextField, Typography, Button } from '@mui/material';
import { useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import HorizontalDashedDivider from './horizontal-dashed-divider';
import SearchFlightsButton from './search-flights-button';
import type { OnSubmitSearchForm } from '../../types/flight';
import { t } from 'i18next';

type Props = {
    onSubmit: OnSubmitSearchForm;
};

const RoundTripForm: React.FC<Props> = ({ onSubmit }) => {
    const [departureAirport, setDepartureAirport] = useState('');
    const [arrivalAirport, setArrivalAirport] = useState('');

    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');

    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const legsQueryParams = new URLSearchParams({
            ...(departureAirport && { origin: departureAirport }),
            ...(arrivalAirport && { destination: arrivalAirport }),
            ...(departureDate && { date: departureDate }),
            ...(returnDate && { returnDate: returnDate }),
        });

        onSubmit(legsQueryParams);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth 
                            label={t('departure-airport')}
                            required
                        value={departureAirport} onChange={(e) => setDepartureAirport(e.target.value)} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth
                            label={t('arrival-airport')}
                            required
                        value={arrivalAirport} onChange={(e) => setArrivalAirport(e.target.value)} />
                    </Grid>

                    <Grid item xs={12}>
                        <DateRangePicker
                            value={dateRange}
                            label={t('trip-date')} required
                            onChange={(newValue) => {
                                setDateRange(newValue);
                                const [start, end] = newValue;
                                setDepartureDate(start ? start.toISOString().split('T')[0] : '');
                                setReturnDate(end ? end.toISOString().split('T')[0] : '');
                            }}
                            renderInput={(startProps, endProps) => (
                                <>
                                    <TextField {...startProps} fullWidth sx={{ mr: 1 }} />
                                    <TextField {...endProps} fullWidth />
                                </>
                            )}
                        />
                    </Grid>

                    <HorizontalDashedDivider />

                </Grid>
                    <HorizontalDashedDivider />
                <Grid item >
                    <SearchFlightsButton />
                </Grid>
            </form>
        </LocalizationProvider>
    );
};

export default RoundTripForm;
