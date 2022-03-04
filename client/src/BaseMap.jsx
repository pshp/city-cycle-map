import React, { useEffect, useState } from "react";
import ReactMapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import PinList from "./componants/PinList";
import InfoBox from "./componants/InfoBox";

const BaseMap = () => {
  return (
    <div className="Map">
      <ReactMapGL
        initialViewState={{
          longitude: 13.405,
          latitude: 52.52,
          zoom: 10,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      >
        <PinList />
        <InfoBox />
      </ReactMapGL>
    </div>
  );
};

export default BaseMap;
