import React, { useEffect, useState } from "react";
import ReactMapGL, { useMap } from "react-map-gl";
import PinList from "./PinList";
import "./BaseMap.css";
import { getPins, postPin, editPin, deletePin } from "../services/api-service";
import { MyContext } from "../context";
import "./Pin.css";

const BaseMap = () => {
  const { myMap } = useMap();

  const [currentPinId, setCurrentPinId] = useState(0);
  const initialZoom = 11;
  const [zoom, setZoom] = useState(initialZoom);
  const [pinArray, setPinArray] = useState([]);
  const [newPlace, setNewPlace] = useState(null);
  const [editPlace, setEditPlace] = useState(false);

  useEffect(() => {
    getPins()
      .then((pins) => {
        setPinArray(pins);
      })
      .catch((e) => console.log(e));
  }, []);

  const onMapZoom = (el) => {
    setZoom(el.viewState.zoom);
  };

  const handleEdit = () => {
    setEditPlace(true);
  };

  const handleDelete = () => {
    console.log(currentPinId);
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

  const handleClose = () => {
    setNewPlace(null);
    setEditPlace(false);
    setCurrentPinId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPlace == null) {
      handleEditSubmit(e);
    } else {
      handleNewPinSubmit(e);
    }
  };

  const handleNewPinSubmit = (e) => {
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

  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log("edit started, id:", currentPinId);

    const body = {
      // longitude: newPlace.lng,
      // latitude: newPlace.lat,
      title: e.target.title.value,
      description: e.target.description.value,
    };

    editPin(currentPinId, body)
      .then((pin) => {
        const newPins = pinArray.map((el) => {
          if (el._id === currentPinId) {
            el.title = e.target.title.value;
            el.description = e.target.description.value;
          }
          return el;
        });
        setPinArray(newPins);
        pinClick(pin._id);
        setEditPlace(false);
        //   console.log(pin);
      })
      .catch((e) => console.log(e));
  };

  const pinClick = (id) => {
    setNewPlace(null);
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
        handleSubmit,
        handleClose,
        handleDelete,
        handleEdit,
        editPlace,
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
