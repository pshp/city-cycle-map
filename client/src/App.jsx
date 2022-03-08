import React, { useState, useEffect } from 'react';
import './App.css';
import { MapProvider } from 'react-map-gl';
import * as turf from '@turf/turf';
import BaseMap from './componants/BaseMap';
import DirectionsMap from './componants/DirectionsMap';
import { getPins } from './services/api-service';

const formatClearances = (data) => {
  const arr = data.map((el) => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [el.longitude, el.latitude],

    },
    properties: {
      clearance: "13' 2",
    },
  }));
  return {
    type: 'FeatureCollection',
    features: arr,
  };
};

function App() {
  const [showDirections, setShowDirections] = useState(false);
  const latStore = 52.52;
  const lngStore = 13.405;
  const zoomStore = 13;
  const [osbstacle, setObstacle] = useState(null);

  useEffect(() => {
    getPins()
      .then((pins) => {
        const clearances = formatClearances(pins);
        const obs = turf.buffer(clearances, 0.03, { units: 'kilometers' });
        setObstacle(obs);
      })
      .catch((e) => console.log(e));
  });

  const handleClickDirections = (e) => {
    e.preventDefault();
    if (showDirections) window.location.reload(false);

    setShowDirections(!showDirections);
  };

  return (
    <div className="App">
      <div className="Map">
        <MapProvider>
          {!showDirections && (
          <BaseMap
            latStore={latStore}
            lngStore={lngStore}
            zoomStore={zoomStore}
            handleClickDirections={handleClickDirections}

          />
          )}
          {showDirections && (
            <div id="directionsMap">
              <DirectionsMap
                obstacle={osbstacle}
                latStore={latStore}
                lngStore={lngStore}
                zoomStore={zoomStore}
                handleClickDirections={handleClickDirections}
              />
            </div>
          )}

        </MapProvider>
      </div>
    </div>
  );
}

export default App;
