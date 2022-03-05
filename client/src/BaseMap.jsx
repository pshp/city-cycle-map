import React, { useEffect, useState } from "react";
import ReactMapGL from "react-map-gl";
import PinList from "./componants/PinList";
import "./BaseMap.css";

const BaseMap = () => {
  const [zoom, setZoom] = useState(null);


  const onMapLoad = (e) => {
    setZoom(e);
  };

  return (
    <div className="map">
      <ReactMapGL
        initialViewState={{
          longitude: 13.405,
          latitude: 52.52,
          zoom: 10,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        onZoom={ el => onMapLoad(el.viewState.zoom) }

      >
        <PinList zoom={zoom} />
      </ReactMapGL>
    </div>
  );
};

export default BaseMap;
