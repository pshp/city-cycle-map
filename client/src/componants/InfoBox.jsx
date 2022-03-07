import React, { useContext } from 'react';
import { Popup } from 'react-map-gl';
import './Pin.css';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MyContext from '../context';

function InfoBox({ data }) {
  const {
    handleClickDelete, handleClickEdit, handleClickClose, panMap,
  } = useContext(MyContext);

  return (
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
              handleClickEdit();
            }}
          />
          <DeleteForeverIcon
            className="delete-button icon-button"
            onClick={() => {
              handleClickDelete();
            }}
          />
          <CloseIcon
            className="close-button icon-button"
            onClick={() => {
              handleClickClose();
            }}
          />
        </div>
        <p className="label">Place</p>
        <p className="title">{data.title}</p>
        <p className="label">Description</p>
        <p className="desc">{data.description}</p>
        <p className="label">Info</p>
        <p className="username">
          Created by
          {' '}
          <b>{data.username}</b>
        </p>
        <p className="date">1 hour ago</p>
      </div>
    </Popup>
  );
}

export default InfoBox;
