import {
    Modal,
    Box,
    Card,
    Grid,
    Typography,
    Divider,
    Avatar,
    Stack,
    IconButton,
    Fade,
    Backdrop
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FlightMap } from '../flight-map';
import type { Itinerary } from '../../types/search-Flight-response';
import { motion } from 'framer-motion';
import { prepareLegsWithCoordinates } from '../../utils/prepare-airport-legs-coords';

type Props = {
    open: boolean;
    onClose: () => void;
    itinerary: Itinerary | null;
};

const FlightDetailHero: React.FC<Props> = ({ open, onClose, itinerary }) => {
    if (!itinerary) return null;
    return (
        <Card
            component={motion.div}
            layoutId={`card-${itinerary.id}`}
            sx={{
                p: 4,
                borderRadius: '24px',
                boxShadow: 6,
                background: 'linear-gradient(135deg, #f9fafe, #e8ecff)',
            }}
        >
            <Modal
                open={open}
                onClose={onClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
            >
                <Fade in={open}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            outline: 'none',
                        }}
                    >
                        <Card
                            sx={{
                                px: 4,
                                borderRadius: '24px',
                                background: 'linear-gradient(135deg, #f9fafe, #e8ecff)',
                                boxShadow: 6,
                                position: 'relative',
                            }}
                        >
                            {/* Close Button */}
                            <IconButton onClick={onClose} sx={{ position: 'absolute', top: 16, right: 0, color: 'white' }}>
                                <CloseIcon />
                            </IconButton>

                            <Grid container spacing={4}>
                                {/* Ticket Info */}
                                <Grid item xs={12} md={7} sx={{ py: 4 }}>
                                    <Typography variant="h5" gutterBottom>
                                        {itinerary.price.formatted}
                                    </Typography>

                                    {itinerary.legs.map((leg, index) => (
                                        <Box key={index} sx={{ mb: 2 }}>
                                            <Stack direction="row" justifyContent="space-between">
                                                <Typography fontWeight="bold">
                                                    {leg.origin.displayCode} → {leg.destination.displayCode}
                                                </Typography>
                                                <Typography>
                                                    {new Date(leg.departure).toLocaleTimeString([], {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}{' '}
                                                    –{' '}
                                                    {new Date(leg.arrival).toLocaleTimeString([], {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </Typography>
                                            </Stack>

                                            <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                                                <Avatar src={leg.carriers.marketing[0]?.logoUrl} sx={{ width: 24, height: 24 }} />
                                                <Typography variant="body2">
                                                    {leg.carriers.marketing[0]?.name} · Flight {leg.segments[0]?.flightNumber}
                                                </Typography>
                                            </Stack>

                                            <Typography variant="body2" color="text.secondary" mt={0.5}>
                                                Duration: {(leg.durationInMinutes / 60).toFixed(1)} hrs · Stops: {leg.stopCount}
                                            </Typography>

                                            {index < itinerary.legs.length - 1 && <Divider sx={{ my: 2 }} />}
                                        </Box>
                                    ))}
                                </Grid>
                                {/* Flight Map */}
                                <Grid item xs={12} md={5} sx={{ pl: 5 }}>
                                    <Box
                                        sx={{
                                            height: '100%',
                                            width: '110%',
                                            display: 'flex',
                                            borderLeft: '2px dashed #ccc',
                                            borderRadius: '0 24px 24px 0',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        <FlightMap
                                            legsCoords=
                                            {prepareLegsWithCoordinates(itinerary.legs)}
                                        />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Card>
                    </Box>
                </Fade>
            </Modal>
        </Card>
    );
};

export default FlightDetailHero;
