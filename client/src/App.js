import React from "react";
import "./App.css";
import BaseMap from "./componants/BaseMap";
import { MapProvider } from "react-map-gl";
import UserButtons from "./componants/UserButtons";

const App = () => {
  return (
    <div className="App">
      <>
       <UserButtons/>
      </>

      <div className="Map">
        <MapProvider>
          <BaseMap />
        </MapProvider>
      </div>
    </div>
  );
};

export default App;
