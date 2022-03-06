import React, { useEffect, useState } from "react";
import ReactMapGL, { useMap } from "react-map-gl";
import PinList from "./PinList";
import "./BaseMap.css";
import { getPins, postPin, deletePin } from "../services/api-service";
import { MyContext } from "../context";
import "./Pin.css";

const BaseMap = () => {
  const { myMap } = useMap();

  const [currentPinId, setCurrentPinId] = useState(0);
  const initialZoom = 11;
  const [zoom, setZoom] = useState(initialZoom);
  const [pinArray, setPinArray] = useState([]);
  const [newPlace, setNewPlace] = useState(null);

  useEffect(() => {
    getPins()
      .then((pins) => {
        setPinArray(pins);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleClose = () => {
    setNewPlace(null);
  };

  const onMapZoom = (el) => {
    setZoom(el.viewState.zoom);
  };

  const handleDelete = () => {
    console.log(currentPinId)
    deletePin(currentPinId)
      .then(() => {
        const newPins = pinArray.filter((el) => el._id !== currentPinId);
        setPinArray(newPins);
      })
      .catch((e) => console.log(e));
  };

  const handleAddClick = (e) => {
    setCurrentPinId(null);
    const { lng, lat } = e.lngLat;
    panMap(lng, lat);
    setNewPlace({
      lat: lat,
      lng: lng,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPlace == null) {
      return;
    }
    const newPin = {
      longitude: newPlace.lng,
      latitude: newPlace.lat,
      username: "empty",
      title: e.target.title.value,
      description: e.target.description.value,
    };

    postPin(newPin)
      .then((pin) => {
        setPinArray((currPins) => [...currPins, pin]);
        pinClick(pin._id);
        //   console.log(pin);
      })
      .catch((e) => console.log(e));
    setNewPlace(null);
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
        handleDelete,
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
        </ReactMapGL>
      </div>
    </MyContext.Provider>
  );
};

export default BaseMap;
