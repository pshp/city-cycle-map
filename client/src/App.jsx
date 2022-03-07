import React from 'react';
import './App.css';
import { MapProvider } from 'react-map-gl';
import BaseMap from './componants/BaseMap';
import DirectionsMap from './componants/DirectionsMap';
function App() {
  return (
    <div className="App">
      <div className="Map">
        <MapProvider>
          <BaseMap />
        </MapProvider>
      </div>
      {/* <DirectionsMap/> */}
    </div>
  );
}

export default App;
