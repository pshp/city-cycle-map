import React, { useState } from "react";
import { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Room from "@mui/icons-material/Room";
import InfoBox from "./InfoBox";

const size = 20;

const Pin = ({ data, zoom }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(!showPopup);
  }

  return (
    <div>
      <Marker
        longitude={data.longitude}
        latitude={data.latitude}
        anchor="bottom"
        draggable="true"
        offset={[0,0.6*zoom]}

        onClick={() => {
          handleClick();
        }}
      >
        <Room style={{
           color: "slateblue",
           height: size,

           }} />
      </Marker>
      {showPopup && (
        <InfoBox data={data}/>
      )}
    </div>
  );
};

export default Pin;
