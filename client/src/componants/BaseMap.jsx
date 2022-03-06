import React, { useEffect, useState } from "react";
import ReactMapGL, { useMap, ScaleControl, NavigationControl } from "react-map-gl";
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
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    getPins()
      .then((pins) => {
        setPinArray(pins);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (editPlace) {
      const details = pinArray.find((el) => el._id == currentPinId);
      setTitle(details.title);
      setDesc(details.description);
    } else {
      setTitle("");
      setDesc("");
    }
  }, [editPlace]);

  useEffect(() => {
    setTitle("");
    setDesc("");
    setEditPlace(false);
  }, [currentPinId]);

  const pinClick = (id) => {
    setNewPlace(null);
    setCurrentPinId(id);
  };

  const panMap = (lon, lat) => {
    myMap.flyTo({ center: [lon, lat] });
  };

  const onMapZoom = (el) => {
    setZoom(el.viewState.zoom);
  };

  const handleDescChange = (d) => {
    setDesc(d);
  };

  const handleTitleChange = (t) => {
    setTitle(t);
  };

  const handleClickEdit = () => {
    setEditPlace(true);
  };

  const handleClickDelete = () => {
    deletePin(currentPinId)
      .then(() => {
        const newPins = pinArray.filter((el) => el._id !== currentPinId);
        setPinArray(newPins);
      })
      .catch((e) => console.log(e));
  };

  const handleClickAdd = (e) => {
    setCurrentPinId(null);
    const { lng, lat } = e.lngLat;
    panMap(lng, lat);
    setNewPlace({
      lat: lat,
      lng: lng,
    });
  };

  const handleClickClose = () => {
    setNewPlace(null);
    setCurrentPinId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPlace == null) {
      handleEditSubmit();
    } else {
      handleNewPinSubmit();
    }
  };

  const handleNewPinSubmit = () => {
    const newPin = {
      longitude: newPlace.lng,
      latitude: newPlace.lat,
      username: "empty",
      title: title,
      description: desc,
    };

    postPin(newPin)
      .then((pin) => {
        setPinArray((currPins) => [...currPins, pin]);
        setNewPlace(null);
        pinClick(pin._id);
      })
      .catch((e) => console.log(e));
  };

  const handleEditSubmit = () => {
    const body = {
      title: title,
      description: desc,
    };

    editPin(currentPinId, body)
      .then((pin) => {
        const newPins = pinArray.map((el) => {
          if (el._id === currentPinId) {
            el.title = title;
            el.description = desc;
          }
          return el;
        });
        setPinArray(newPins);
        pinClick(pin._id);
        setEditPlace(false);
      })
      .catch((e) => console.log(e));
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
        handleClickClose,
        handleClickDelete,
        handleClickEdit,
        editPlace,
        title,
        desc,
        handleDescChange,
        handleTitleChange,
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
            handleClickAdd(e);
          }}
        >
          <PinList pinArray={pinArray} />
          <ScaleControl/>
          <NavigationControl />



        </ReactMapGL>

      </div>

    </MyContext.Provider>
  );
};

export default BaseMap;
