// MapPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const MapPage: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Map Page</h1>
      {/* Leaflet map component goes here */}
      <nav>
        <ul>
          <li><Link to="/">Go to Landing Page</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default MapPage;