import React, { useRef, useEffect, useState } from "react";
import Map, {Marker} from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";

const BaseMap = () => {

return (
<Map
  initialViewState={{
    longitude: 13.405,
    latitude: 52.52,
    zoom: 12,
  }}
  style={{width: '100vw', height: '100vh'}}
  mapStyle="mapbox://styles/mapbox/streets-v9"
  mapboxAccessToken={process.env.REACT_APP_MAPBOX}

/>
);
}

export default BaseMap;
