import React, { useEffect, useState, useRef } from "react";
import ReactMapGL, { useMap } from "react-map-gl";
import PinList from "./PinList";
import "./BaseMap.css";
import { getPins, postPin } from "../services/api-service";

const BaseMap = () => {
  const { myMap } = useMap();

  const initialZoom = 11;
  const [zoom, setZoom] = useState(initialZoom);
  const [pinArray, setPinArray] = useState([]);

  useEffect(() => {
    getPins()
      .then((pins) => {
        setPinArray(pins);
      })
      .catch((e) => console.log(e));
  }, []);

  const onMapLoad = (el) => {
    setZoom(el.viewState.zoom);
  };

  const handleRightClick = (e) => {
    const { lng, lat } = e.lngLat;
    console.log(lng, lat);

    const newPin = {
      longitude: lng,
      latitude: lat,
      username: "empty",
    };

    postPin(newPin)
      .then((pin) => {
        setPinArray((currPins) => [...currPins, pin]);
      })
      .catch((e) => console.log(e));
    console.log(myMap);
    myMap.flyTo({ center: [lng, lat] });
  };

  return (
    <div className="map">
      <ReactMapGL
        id="myMap"
        initialViewState={{
          longitude: 13.405,
          latitude: 52.52,
          zoom: initialZoom,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
        onZoom={(el) => onMapLoad(el)}
        onContextMenu={(e) => handleRightClick(e)}
      >
        <PinList pinArray={pinArray} zoom={zoom} />
      </ReactMapGL>
    </div>
  );
};

export default BaseMap;
