import React, { useEffect, useState, useMemo } from 'react';
import ReactMapGL, {
  useMap,
  ScaleControl,
  NavigationControl,
} from 'react-map-gl';
import PinList from './PinList';
import './BaseMap.css';
import {
  getPins, postPin, editPin, deletePin,
} from '../services/api-service';
import MyContext from '../context';
import './Pin.css';
import UserButtons from './account/UserButtons';
import Register from './account/Register';
import Login from './account/Login';

function BaseMap() {
  const userStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(null);
  const { myMap } = useMap();
  // const [currentUser, setCurrentUser] = useState(null);
  const [currentPinId, setCurrentPinId] = useState(0);
  const initialZoom = 11;
  const [zoom, setZoom] = useState(initialZoom);
  const [pinArray, setPinArray] = useState([]);
  const [newPlace, setNewPlace] = useState(null);
  const [editPlace, setEditPlace] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (userStorage.user) {
      setCurrentUser(userStorage.user);
    }
  }, []);

  useEffect(() => {
    getPins()
      .then((pins) => {
        setPinArray(pins);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (editPlace) {
      const details = pinArray.find((el) => el._id === currentPinId);
      setTitle(details.title);
      setDesc(details.description);
    } else {
      setTitle('');
      setDesc('');
    }
  }, [editPlace]);

  useEffect(() => {
    setTitle('');
    setDesc('');
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

  const handleRegisterStart = () => {
    setShowRegister(!showRegister);
    setShowLogin(false);
  };
  const handleRegisterSubmit = () => {
    setShowRegister(false);
  };

  const handleRegisterClose = () => {
    setShowRegister(false);
  };

  const handleLoginStart = () => {
    setShowLogin(!showLogin);
    setShowRegister(false);
  };
  const handleLoginSubmit = (username) => {
    userStorage.setItem('user', username);
    setCurrentUser(username);
    setTimeout(() => {
      setShowLogin(false);
    }, 1000);
  };

  const handleLoginClose = () => {
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
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
    const { lng, lat } = e.lngLat;
    panMap(lng, lat);
    if (!currentUser) return;
    setCurrentPinId(null);
    setNewPlace({
      lat,
      lng,
    });
  };

  const handleClickClose = () => {
    setNewPlace(null);
    setCurrentPinId(null);
  };

  const handleNewPinSubmit = () => {
    const newPin = {
      longitude: newPlace.lng,
      latitude: newPlace.lat,
      username: currentUser,
      title,
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
      title,
      description: desc,
    };

    editPin(currentPinId, body)
      .then((pin) => {
        const newPins = pinArray.map((el) => {
          const newEl = el;
          if (newEl._id === currentPinId) {
            newEl.title = title;
            newEl.description = desc;
          }
          return newEl;
        });
        setPinArray(newPins);
        pinClick(pin._id);
        setEditPlace(false);
      })
      .catch((e) => console.log(e));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPlace == null) {
      handleEditSubmit();
    } else {
      handleNewPinSubmit();
    }
  };
  const contextStuff = useMemo(() => ({
    currentUser,
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
    showRegister,
    showLogin,
    handleRegisterStart,
    handleRegisterSubmit,
    handleRegisterClose,
    handleLoginStart,
    handleLoginSubmit,
    handleLoginClose,
    handleLogout,
    userStorage,
  }), [
    currentUser,
    currentPinId,
    zoom,
    newPlace,
    title,
    desc,
    showRegister,
    showLogin,
    userStorage]);

  return (
    <MyContext.Provider
      value={contextStuff}
    >
      <div className="map">
        <ReactMapGL
          id="myMap"
          initialViewState={{
            longitude: 13.405,
            latitude: 52.52,
            zoom: initialZoom,
          }}
          style={{ width: '100vw', height: '100vh' }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={process.env.REACT_APP_MAPBOX}
          onZoom={(el) => onMapZoom(el)}
          doubleClickZoom={false}
          onDblClick={(e) => {
            handleClickAdd(e);
          }}
        >
          { currentUser && (<PinList pinArray={pinArray} />)}
          <ScaleControl />
          <NavigationControl />
          <UserButtons />
          {showRegister && (<Register />)}
          {showLogin && (<Login />)}

        </ReactMapGL>
      </div>
    </MyContext.Provider>
  );
}

export default BaseMap;
