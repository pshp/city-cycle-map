import React from "react";
import { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import RoomIcon from "@mui/icons-material/Room";

const Pin = ({ data }) => {
  return (
    <>
      <Marker
        longitude={data.longitude}
        latitude={data.latitude}
        anchor="bottom"
        draggable="true"
      >
        <RoomIcon style={{ color: "slateblue", fontSize: 50 }} />
      </Marker>
    </>
  );
};

export default Pin;
