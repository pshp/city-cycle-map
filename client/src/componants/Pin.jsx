import React, { useState } from "react";
import { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Room from "@mui/icons-material/Room";
import StarIcon from "@mui/icons-material/Star";
import { Popup } from "react-map-gl";
import "./Pin.css";

const Pin = ({ data, zoom }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <Marker
        longitude={data.longitude}
        latitude={data.latitude}
        anchor="bottom"
        draggable="true"
        offset={[0, 0.8 * zoom]}
        onClick={() => {
          handleClick();
        }}
      >
        <Room
          style={{
            color: "slateblue",
            fontSize: 30,
          }}
        />
      </Marker>
      {showPopup && (
        <Popup
          longitude={data.longitude}
          latitude={data.latitude}
          anchor="left"
          closeOnClick={false}
          offset={[9, -8]}
          onClose={() => {
            handleClick();
          }}
        >
          <div className="card">
            <label>Place</label>
            <h4 className="title">{data.title}</h4>
            <label>Review</label>
            <p>{data.description}</p>
            <label>Rating</label>
            <div>
              <StarIcon className="star" />
              <StarIcon className="star" />
              <StarIcon className="star" />
              <StarIcon className="star" />
              <StarIcon className="star" />
            </div>
            <label>Info</label>
            <span className="username">
              Created by <b>{data.username}</b>
            </span>
            <span className="date">1 hour ago</span>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default Pin;
