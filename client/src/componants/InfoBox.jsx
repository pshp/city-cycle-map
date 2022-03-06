import React, { useContext } from "react";
import { Marker } from "react-map-gl";
import Room from "@mui/icons-material/Room";
import { Popup } from "react-map-gl";
import "./Pin.css";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { MyContext } from "../context";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const InfoBox = ({ data }) => {
  const {
    handleDelete,
    handleEdit,
    handleClose,
    currentPinId,
    pinClick,
    zoom,
    newPlace,
    panMap,
  } = useContext(MyContext);

  return (
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
          <div className="icon-buttons">
            <EditIcon
              className="edit-button icon-button"
              onClick={() => {
                handleEdit();
              }}
            />
            <DeleteForeverIcon
              className="delete-button icon-button"
              onClick={() => {
                handleDelete();
              }}
            />
            <CloseIcon
              className="close-button icon-button"
              onClick={() => {
                handleClose();
              }}
            />
          </div>
          <label>Place</label>
          <p className="title">{data.title}</p>
          <label>Description</label>
          <p className="desc">{data.description}</p>
          <label>Info</label>
          <p className="username">
            Created by <b>{data.username}</b>
          </p>
          <p className="date">1 hour ago</p>
        </div>
      </Popup>
    </>
  );
};

export default InfoBox;
