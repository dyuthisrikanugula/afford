import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShortenerForm from './components/ShortenerForm';
import StatsPage from './components/StatsPage';
import RedirectPage from './components/RedirectPage';
import { Container, Typography } from '@mui/material';

export default function App(){
  return (
    <BrowserRouter>
      <Container maxWidth="md" sx={{mt:4}}>
        <Typography variant="h4" align="center" gutterBottom>
          React URL Shortener
        </Typography>
        <Routes>
          <Route path="/" element={<ShortenerForm />} />
          <Route path="/stats/:code" element={<StatsPage />} />
          <Route path="/:code" element={<RedirectPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
