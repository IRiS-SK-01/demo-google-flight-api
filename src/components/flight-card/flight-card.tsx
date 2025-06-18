import React from 'react';
import {
    Box,
    Card,
    Typography,
    Stack,
    Avatar,
    Divider
} from '@mui/material';
import type { Itinerary } from '../../types/search-Flight-response';
import { t } from 'i18next';
import { motion } from 'framer-motion';

type Props = {
    itinerary: Itinerary;
    onClick: () => void;
};

export const FlightCard: React.FC<Props> = ({ itinerary, onClick }) => {
    return (
        <motion.div layoutId={`card-${itinerary.id}`} onClick={onClick}>

            <Card
                onClick={onClick}
                sx={{
                    p: 2,
                    mb: 2,
                    cursor: 'pointer',
                    transition: 'box-shadow 0.3s',
                    '&:hover': { boxShadow: 6 },
                }}
            >
                <Typography variant="h6" gutterBottom>
                    {itinerary.price.formatted}
                </Typography>

                {itinerary.legs.map((leg, index) => (
                    <Box key={index}>
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                            <Typography>
                                {leg.origin.displayCode} → {leg.destination.displayCode}
                            </Typography>
                            <Typography>
                                {new Date(leg.departure).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} –{' '}
                                {new Date(leg.arrival).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </Typography>
                        </Stack>

                        <Stack direction="row" spacing={1} alignItems="center" mt={1}>
                            <Avatar
                                src={leg.carriers.marketing[0]?.logoUrl}
                                alt={leg.carriers.marketing[0]?.name}
                                sx={{ width: 24, height: 24 }}
                            />
                            <Typography variant="body2">
                                {leg.carriers.marketing[0]?.name} · {leg.segments[0].flightNumber}
                            </Typography>
                        </Stack>

                        <Typography variant="body2" color="text.secondary" mt={0.5}>
                            {t('duration')}: {(leg.durationInMinutes / 60).toFixed(1)} {t('hrs')} · {t('stops')}: {leg.stopCount}
                        </Typography>

                        {index < itinerary.legs.length - 1 && <Divider sx={{ my: 2 }} />}
                    </Box>
                ))}
            </Card>
        </motion.div>

    );
};
