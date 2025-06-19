import {
    Grid, FormControl, InputLabel, Select, MenuItem, Slider, Typography
} from '@mui/material';
import type { SortOption } from '../../types/flight';
import { t } from 'i18next';

type Props = {
    sort: SortOption;
    setSort: (val: SortOption) => void;
    airlines: string[];
    durationRange: [number, number];
    setDurationRange: (val: [number, number]) => void;
    selectedAirlines: string[];
    setSelectedAirlines: (val: string[]) => void;
};

export const FlightFilters: React.FC<Props> = ({
    sort,
    setSort,
    airlines,
    durationRange,
    setDurationRange,
    selectedAirlines,
    setSelectedAirlines,
}) => {
    return (
        <Grid container spacing={2} justifyContent="flex-end" sx={{ mx: 4 }} >

            <Grid item>
                <FormControl sx={{ width: 180, }}>
                    <Typography variant="subtitle2" gutterBottom>
                        {t('duration')} ({t('hrs')})

                    </Typography>
                    <Slider
                        value={durationRange}
                        min={0}
                        max={2000}
                        onChange={(_, newValue) => setDurationRange(newValue as [number, number])}
                        valueLabelDisplay="auto"
                        marks={[
                            { value: 0, label: '0h' },
                            { value: 2000, label: '33.3h' },
                        ]}
                    />
                </FormControl>
            </Grid>

            <Grid item>
                <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel>{t('sort-by')}</InputLabel>
                    <Select
                        value={sort}
                        label={t('sort-by')}
                        onChange={(e) => setSort(e.target.value as SortOption)}
                    >
                        <MenuItem value="price">{t('price')}</MenuItem>
                        <MenuItem value="duration">{t('duration')}</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid item>
                <FormControl sx={{ width: 360 }}>
                    <InputLabel>{t('carriers')}</InputLabel>
                    <Select
                        multiple
                        value={selectedAirlines}
                        onChange={(e) => setSelectedAirlines(e.target.value as string[])}
                        renderValue={(selected) => selected.join(', ')}
                        label={t('carriers')}
                    >
                        {airlines.map((airline) => (
                            <MenuItem key={airline} value={airline}>
                                {airline}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>

    );
};