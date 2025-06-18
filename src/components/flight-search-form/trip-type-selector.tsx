import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { ConnectingAirportsRounded, AirplanemodeActiveRounded, TimelineRounded } from '@mui/icons-material';
import { TripType } from '../../types/flight';
import { t } from 'i18next';

type Props = {
  value: TripType;
  onChange: (value: TripType) => void;
};

export const TripTypeSelector: React.FC<Props> = ({ value, onChange }) => {
  const handleChange = (_: React.MouseEvent<HTMLElement>, newValue: TripType | null) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  return (
    <Box>
      <ToggleButtonGroup value={value} exclusive onChange={handleChange} color="primary">
        <ToggleButton value={TripType.ONE_WAY}>
          <AirplanemodeActiveRounded fontSize="small" />
          &nbsp;{t('trip-type.one-way')}
        </ToggleButton>
        <ToggleButton value={TripType.ROUND_TRIP}>
          <ConnectingAirportsRounded fontSize="small" />
          &nbsp;{t('trip-type.round')}
        </ToggleButton>
        <ToggleButton value={TripType.MULTI_CITY}>
          <TimelineRounded fontSize="small" />
          &nbsp;{t('trip-type.multi-city')}
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};
