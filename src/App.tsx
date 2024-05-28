import { useState } from 'react'
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MapPage from './pages/MapPage';
import AppartementenTablePage from './pages/AppartementenTablePage';
import ReparatiesTablePage from './pages/ReparatiesTablePage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/AppartementenTable" element={<AppartementenTablePage />} />
        <Route path="/ReparatiesTable" element={<ReparatiesTablePage />} />
      </Routes>
    </Router>
  );
};

export default App;
