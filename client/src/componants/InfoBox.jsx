import React from "react";
import { Popup } from "react-map-gl";
import StarIcon from "@mui/icons-material/Star";
import "./InfoBox.css";

const InfoBox = ({ data, handleClick }) => {
  return (
    <>
      <Popup
        longitude={data.longitude}
        latitude={data.latitude}
        anchor="left"
        closeOnClick={false}
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
    </>
  );
};

export default InfoBox;
