import React from "react";
import "./App.css";
import BaseMap from "./componants/BaseMap";
import { MapProvider } from "react-map-gl";

const App = () => {
  return (
    <div className="App">
      <MapProvider>
        <BaseMap />
      </MapProvider>
    </div>
  );
};

export default App;
