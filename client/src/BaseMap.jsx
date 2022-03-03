import React, { useRef, useEffect, useState } from "react";
import ReactMapGL, {Marker} from 'react-map-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import markerBlue from './assets/marker-blue.png';

const BaseMap = () => {

return (
  <div className="Map">
    <ReactMapGL
      initialViewState={{
        longitude: 13.405,
        latitude: 52.52,
        zoom: 12,
      }}
      style={{width: '100vw', height: '100vh'}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
    >
      <Marker longitude={13.405} latitude={52.52} anchor="bottom" draggable="true" >
      <img src={markerBlue} />
    </Marker>
    </ReactMapGL>

</div>
);
}

export default BaseMap;
