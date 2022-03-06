import React, { useContext } from "react";
import { Marker } from "react-map-gl";
import Room from "@mui/icons-material/Room";
import { Popup } from "react-map-gl";
import "./Pin.css";
import { MyContext } from "../context";
import CloseIcon from "@mui/icons-material/Close";
import EditInfoBox from "./EditInfoBox";

const NewPin = () => {
  const { zoom, newPlace } = useContext(MyContext);

  const lat = newPlace.lat;
  const lng = newPlace.lng;

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
            color: "#009cb8",
            fontSize: 30,
          }}
        />
      </Marker>
      <EditInfoBox lng={lng} lat={lat} />
    </>
  );
};

export default NewPin;
