import { useState } from 'react';
import { Box, Button } from '@mui/material';
import type { OnSubmitSearchForm, UiFlightLeg } from '../../types/flight';
import MultiCityLegRow from './multi-city-leg-row';
import HorizontalDashedDivider from './horizontal-dashed-divider';
import SearchFlightsButton from './search-flights-button';
import { t } from 'i18next';

type Props = {
    onSubmit: OnSubmitSearchForm;
};

const FlightMultiCityForm: React.FC<Props> = ({ onSubmit }) => {
    const [legs, setLegs] = useState<UiFlightLeg[]>([
        { departureAirport: '', arrivalAirport: '', departureDate: '' },
    ]);

    const addLeg = () => {
        setLegs((prev) => [...prev, { departureAirport: '', arrivalAirport: '', departureDate: '' }]);
    };

    const removeLeg = (index: number) => {
        setLegs((prev) => prev.filter((_, i) => i !== index));
    };

    const updateLeg = (index: number, key: keyof UiFlightLeg, value: string) => {
        setLegs((prev) =>
            prev.map((leg, i) =>
                i === index ? { ...leg, [key]: value } : leg
            )
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const isValid = legs.every((leg) => leg.departureAirport && leg.arrivalAirport && leg.departureDate);
        if (!isValid) return;

        const query = new URLSearchParams();

        const segments = legs
            .map((leg, i) => `origin${i}=${leg.departureAirport}&destination${i}=${leg.arrivalAirport}&date${i}=${leg.departureDate}`)
        
        query.set('legs', JSON.stringify(segments));

        onSubmit(query);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box>
                {legs.map((leg, index) => (
                    <MultiCityLegRow
                        key={index} 
                        leg={leg}
                        index={index}
                        onChange={updateLeg}
                        onRemove={removeLeg}
                        canRemove={legs.length > 1}
                    />
                ))}

                <Button onClick={addLeg} variant="outlined" sx={{ mt: 2 }}>
                    {t('add-flight-button')}
                </Button>
                <HorizontalDashedDivider />

                <SearchFlightsButton />

            </Box>
        </form>
    );
};

export default FlightMultiCityForm;
