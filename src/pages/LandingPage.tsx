// LandingPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

import './LandingPage.css';


const LandingPage: React.FC = () => {
  return (
    <div id="LandingPage">
      <h1>Welcome to the Landing Page</h1>
      <nav>
        <ul>
          <li><Link to="/map">VvE in Kaart</Link></li>
          <li><Link to="/AppartementenTable">Appartementen tabel</Link></li>
          <li><Link to="/ReparatiesTable">Reparaties tabel</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default LandingPage;