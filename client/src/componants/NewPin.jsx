import React, { useContext } from "react";
import { Marker } from "react-map-gl";
import Room from "@mui/icons-material/Room";
import { Popup } from "react-map-gl";
import "./Pin.css";
import { MyContext } from "../context";
import CloseIcon from "@mui/icons-material/Close";

const NewPin = () => {
  const { zoom, newPlace, setNewPlace, handleSubmit } = useContext(MyContext);

  const handleClose = () => {
    setNewPlace(null);
  };

  return (
    <>
      <Marker
        longitude={newPlace.lng}
        latitude={newPlace.lat}
        anchor="bottom"
        draggable="true"
        offset={[0, 0.8 * zoom]}
      >
        <Room
          style={{
            color: "#009cb8",
            fontSize: 30,
          }}
        />
      </Marker>

      <Popup
        longitude={newPlace.lng}
        latitude={newPlace.lat}
        anchor="left"
        closeOnClick={false}
        closeButton={false}
        offset={[9, -8]}
      >
        <form className="submit-card" onSubmit={handleSubmit}>
          {/* <div>
            <Room style={{ color: "violet", fontSize: 20 }} />
            <Room style={{ color: "indigo", fontSize: 20 }} />
            <Room style={{ color: "blue", fontSize: 20 }} />
            <Room style={{ color: "gold", fontSize: 20 }} />
            <Room style={{ color: "orange", fontSize: 20 }} />
            <Room style={{ color: "tomato", fontSize: 20 }} />
          </div> */}
          <CloseIcon
            className="icon-buttons icon-button close-button"
            onClick={() => {
              handleClose();
            }}
          />
          <label>Title</label>
          <input name="title" placeholder="Enter a title" autoFocus />
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Say us something about this place."
          />
          <button type="submit" className="submitButton">
            Add Pin
          </button>
        </form>
      </Popup>
    </>
  );
};

export default NewPin;
