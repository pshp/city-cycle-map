import React, { useState, useContext } from "react";
import { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Room from "@mui/icons-material/Room";
import StarIcon from "@mui/icons-material/Star";
import { Popup } from "react-map-gl";
import "./Pin.css";
import { useMap } from "react-map-gl";
import { MyContext } from "../context";

const Pin = ({ data }) => {
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
  const { myMap } = useMap();
  return (
    <div>
      <Marker
        longitude={data.longitude}
        latitude={data.latitude}
        anchor="bottom"
        draggable="true"
        onClick={() => {
          pinClick(data._id);
        }}
        offset={[0, 0.8 * zoom]}
      >
        <Room
          style={{
            color: "slateblue",
            fontSize: 30,
          }}
        />
      </Marker>
      {newPlace == null && currentPinId == data._id && (
        <>
      <Popup
          onOpen={() => panMap(data.longitude, data.latitude)}
          longitude={data.longitude}
          latitude={data.latitude}
          anchor="left"
          closeOnClick={false}
          closeButton={false}
          offset={[9, -8]}
        >
          <div className="card">
            <button
              className="closeButton"
              onClick={() => {
                closeInfoBox();
              }}
            >
              X
            </button>
            <label>Place</label>
            <h4>{data._id}</h4>
            <h4 className="title">{data.title}</h4>
            <label>Review</label>
            <p>{data.description}</p>
            <label>Info</label>
            <span className="username">
              Created by <b>{data.username}</b>
            </span>
            <span className="date">1 hour ago</span>
          </div>
        </Popup>
        </>
      )}


    </div>
  );
};

export default Pin;
