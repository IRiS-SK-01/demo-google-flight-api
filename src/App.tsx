
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FlightSearchResults from './components/flight-search-results/flight-search-results';
import Home from './pages/home/home';
import { prefixer } from 'stylis';
import { AppBar, Toolbar, Typography, Box, Button, ThemeProvider, createTheme } from '@mui/material';
import i18n from './i18n/i18n';
import { useTranslation } from 'react-i18next';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { changeLanguage } from 'i18next';
import Results from './pages/flight-search-results/results';

const getThemeDirection = (lang: string) => (lang === 'ar' ? 'rtl' : 'ltr');

const TopBar: React.FC = () => {
  return (

    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        color: '#fff',
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">✈️ Flight Finder</Typography>
        <Box>
          <Button color="inherit" onClick={() => changeLanguage('en')}>
            EN
          </Button>
          <Button color="inherit" onClick={() => changeLanguage('ar')}>
            AR
          </Button>
        </Box>
      </Toolbar>
    </AppBar>

  );
};


const App: React.FC = () => {
  const { i18n } = useTranslation();
  const direction = getThemeDirection(i18n.language);

  const theme = createTheme({
    direction,
  });

  const cacheRtl = createCache({
    key: direction === 'rtl' ? 'muirtl' : 'mui',
    stylisPlugins: direction === 'rtl' ? [prefixer, rtlPlugin] : [],
  });

  useEffect(() => {
    document.documentElement.dir = direction;
  }, [direction]);
  return (
    <BrowserRouter>
      <Box
        sx={{
          minHeight: '100vh',
          minWidth: '100vh',
          background: 'radial-gradient(circle at 20% 20%, #B9CCF5FF 10%, #a593f0 40%, #9d8df6 70%, #B5E0FFFF 100%)',
        }}
      >
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <TopBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/results" element={<Results />} />
            </Routes>
          </ThemeProvider>
        </CacheProvider>
      </Box>
    </BrowserRouter>


  )

};

export default App;
