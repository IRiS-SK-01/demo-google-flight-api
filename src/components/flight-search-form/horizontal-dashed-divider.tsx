import { Box } from '@mui/material';

type Props = {
    yMargin?: number;
};

const HorizontalDashedDivider: React.FC<Props> = ({ yMargin = 2 }) => (
    <Box
        sx={{
            flex: 1,
            borderTop: '1px dashed #ccc',
            width: '100%',
            my: yMargin,
        }}
    />
);

export default HorizontalDashedDivider;
