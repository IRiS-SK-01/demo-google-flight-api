import { Box, Card, Typography } from '@mui/material';
import type { ReactNode } from 'react';

type Props = {
    title: string;
    content: ReactNode;
};

const PageLayout: React.FC<Props> = ({ title, content }) => (
    <Box
        sx={{
            minHeight: '100vh',
            width: '100vw',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <Card
            sx={{
                p: 3,
                width: '100%',
                maxWidth: '80vw',
                backdropFilter: 'blur(6px)',
                bgcolor: 'rgba(255,255,255,0.5)',
            }}
        >
            <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{ color: '#8683d9' }}
            >
                {title}
            </Typography>

            {content}
        </Card>
    </Box>
);

export default PageLayout;
