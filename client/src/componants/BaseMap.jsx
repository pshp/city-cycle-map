import React, { useEffect, useState } from "react";
import ReactMapGL, { useMap } from "react-map-gl";
import PinList from "./PinList";
import "./BaseMap.css";
import { getPins, postPin } from "../services/api-service";
import { MyContext } from "../context";
import { Marker } from "react-map-gl";
import Room from "@mui/icons-material/Room";
import { Popup } from "react-map-gl";
import "./Pin.css";
import NewPin from "./NewPin";

const BaseMap = () => {
  const { myMap } = useMap();

  const [currentPinId, setCurrentPinId] = useState(0);
  const initialZoom = 11;
  const [zoom, setZoom] = useState(initialZoom);
  const [pinArray, setPinArray] = useState([]);

  const [newPlace, setNewPlace] = useState(null);
  const [newTitle, setNewTitle] = useState(null);
  const [newDesc, setNewDesc] = useState(null);

  useEffect(() => {
    getPins()
      .then((pins) => {
        setPinArray(pins);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleClose = () => {
    setNewPlace();
  }

  useEffect(() => {
    console.log("pinchanged to:", currentPinId);
  }, [currentPinId]);

  useEffect(() => {
    console.log("NewPlace = ", newPlace);
  }, [newPlace]);

  const onMapZoom = (el) => {
    setZoom(el.viewState.zoom);
  };

  const handleAddClick = (e) => {
    console.log("addclick");
    const { lng, lat } = e.lngLat;
    setNewPlace({
      lat: lat,
      lng: lng,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("NEW EVENT: ", e);

    const newPin = {
      longitude: newPlace.lng,
      latitude: newPlace.lat,
      username: "empty",
    };

    postPin(newPin)
      .then((pin) => {
        setPinArray((currPins) => [...currPins, pin]);
        pinClick(pin._id);
      })
      .catch((e) => console.log(e));
  };

  const closeInfoBox = () => {
    setCurrentPinId(null);
  };

  const pinClick = (id) => {
    setCurrentPinId(id);
  };

  const panMap = (lon, lat) => {
    myMap.flyTo({ center: [lon, lat] });
  };

  return (
    <MyContext.Provider
      value={{
        currentPinId,
        pinClick,
        zoom,
        newPlace,
        setNewPlace,
        panMap,
        closeInfoBox,
        handleSubmit,
        handleClose,
      }}
    >
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
          onZoom={(el) => onMapZoom(el)}
          doubleClickZoom={false}
          onDblClick={(e) => {
            handleAddClick(e);
          }}
        >
          <PinList pinArray={pinArray} />
          {newPlace !== null && (
            <NewPin lat={newPlace.lat} lng={newPlace.lng}></NewPin>
          )}
        </ReactMapGL>
      </div>
    </MyContext.Provider>
  );
};

export default BaseMap;
