import React from 'react';
import './App.css';
import { MapProvider } from 'react-map-gl';
import BaseMap from './componants/BaseMap';

function App() {
  return (
    <div className="App">
      <div className="Map">
        <MapProvider>
          <BaseMap />
        </MapProvider>
      </div>
    </div>
  );
}

export default App;
