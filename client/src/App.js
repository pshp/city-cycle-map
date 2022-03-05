import React from "react";
import "./App.css";
import BaseMap from "./componants/BaseMap";
import {MapProvider} from 'react-map-gl';
import { MyContext } from './context.js'

const App = () => {
  return (
    <div className="App">
    <MapProvider>
        <BaseMap/>
    </MapProvider>
    </div>

  );
};

export default App;
