import React, { useState, useContext } from "react";
import { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Room from "@mui/icons-material/Room";
import StarIcon from "@mui/icons-material/Star";
import { Popup } from "react-map-gl";
import "./Pin.css";
import { useMap } from "react-map-gl";
import { MyContext } from "../context";

const NewPin = ({ lat, lng }) => {
  const {
    currentPinId,
    pinClick,
    zoom,
    newPlace,
    panMap,
    setNewPlace,
    closeInfoBox,
    handleSubmit,
  } = useContext(MyContext);

  const handleClose = () => {
    setNewPlace();
  }

  return (
    <>
      <Marker
        longitude={lng}
        latitude={lat}
        anchor="bottom"
        draggable="true"
        offset={[0, 0.8 * zoom]}
      >
        <Room
          style={{
            color: "slateblue",
            fontSize: 30,
          }}
        />
      </Marker>

      <Popup
        longitude={lng}
        latitude={lat}
        anchor="left"
        closeOnClick={false}
        closeButton={false}
        offset={[9, -8]}
      >
        <div className="card">
          <button
            className="closeButton"
            onClick={() => {
              handleClose();
            }}
          >
            X
          </button>
          <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input placeholder="Enter a title" autoFocus />
            <label>Description</label>
            <textarea placeholder="Say us something about this place." />
            <button type="submit" className="submitButton">
              Add Pin
            </button>
          </form>
        </div>
      </Popup>
    </>
  );
};

export default NewPin;
