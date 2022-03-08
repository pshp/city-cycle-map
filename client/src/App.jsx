import React, { useState, useEffect } from 'react';
import './App.css';
import { MapProvider } from 'react-map-gl';
import BaseMap from './componants/BaseMap';
import DirectionsMap from './componants/DirectionsMap';
import { getPins } from './services/api-service';

function App() {
  const [showDirections, setShowDirections] = useState(false);
  const [latStore, setLatStore] = useState(52.52);
  const [lngStore, setLngStore] = useState(13.405);
  const [zoomStore, setZoomStore] = useState(15);
  const [pins, setPins] = useState([]);

  useEffect(() => {
    getPins()
      .then((pins) => {
        setPins(pins);
      })
      .catch((e) => console.log(e));
  });

  const handleClickDirections = (e) => {
    e.preventDefault();
    setShowDirections(!showDirections);
    // setLngStore(lng);
    // setLatStore(lat);
    // setZoomStore(zoom);
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
          <DirectionsMap
            pins={pins}
            latStore={latStore}
            lngStore={lngStore}
            zoomStore={zoomStore}
            handleClickDirections={handleClickDirections}
          />
          )}

        </MapProvider>
      </div>
    </div>
  );
}

export default App;
