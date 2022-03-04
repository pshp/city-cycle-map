import React, { useRef, useEffect, useState } from "react";
import { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import RoomIcon from "@mui/icons-material/Room";

const Pin = () => {

  return (
    <>
      <Marker
        longitude={13.405}
        latitude={52.52}
        anchor="bottom"
        draggable="true"
      >
        <RoomIcon style={{color:"slateblue", fontSize:50}}/>
      </Marker>
    </>
  );
};

export default Pin;
