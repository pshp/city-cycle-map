
import React, { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Pin from "./Pin";

const PinList = ({zoom, pinArray}) => {

  return pinArray.map((singlePin) => {
    return (
      <React.Fragment key={singlePin._id}>
        <Pin data={singlePin} zoom={zoom} />
      </React.Fragment>
    );
  });
};

export default PinList;
