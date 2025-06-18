import { Grid, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import type { UiFlightLeg } from '../../types/flight';
import { t } from 'i18next';

type Props = {
    leg: UiFlightLeg;
    index: number;
    onChange: (index: number, key: keyof UiFlightLeg, value: string) => void;
    onRemove: (index: number) => void;
    canRemove: boolean;
};

const MultiCityLegRow: React.FC<Props> = ({ leg, index, onChange, onRemove, canRemove }) => (
    <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs={12} sm={4}>
            <TextField
                label={t('departure-airport')}
                fullWidth required
                value={leg.departureAirport}
                onChange={(e) => onChange(index, 'departureAirport', e.target.value)}
            />
        </Grid>
        <Grid item xs={12} sm={4}>
            <TextField
                label={t('arrival-airport')}
                fullWidth required
                value={leg.arrivalAirport}
                onChange={(e) => onChange(index, 'arrivalAirport', e.target.value)}
            />
        </Grid>
        <Grid item xs={10} sm={3}>
            <TextField
                label={t('departure-date')}
                type="date"
                fullWidth required
                InputLabelProps={{ shrink: true }}
                value={leg.departureDate}
                onChange={(e) => onChange(index, 'departureDate', e.target.value)}
            />
        </Grid>
        {canRemove && (
            <Grid item xs={2} sm={1}>
                <IconButton onClick={() => onRemove(index)} aria-label="remove leg">
                    <DeleteIcon />
                </IconButton>
            </Grid>
        )}
    </Grid>
);

export default MultiCityLegRow;