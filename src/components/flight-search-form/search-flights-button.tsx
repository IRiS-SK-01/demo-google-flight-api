import React from 'react';
import { Button, } from '@mui/material';
import { useTranslation } from 'react-i18next';

const SearchFlightsButton: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Button
            type="submit"
            variant="contained"
            sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' ,
                paddingX: 3,
                paddingY: 1,
                fontWeight: 600,
                textTransform: 'none',
                color: '#1976d2',
                backgroundColor: 'rgba(30, 144, 255, 0.25)', // DodgerBlue with transparency
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 4px 30px #1976D222',
                transition: '0.3s',
                '&:hover': {
                    backgroundColor: 'rgba(30, 144, 255, 0.35)',

                },
            }}
        >
            {t('search-flights')}
        </Button>
    );
};

export default SearchFlightsButton;
