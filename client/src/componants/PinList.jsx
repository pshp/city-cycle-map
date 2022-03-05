
import React, { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Pin from "./Pin";

const PinList = ({ pinArray}) => {

  return pinArray.map((singlePin) => {
    return (
      <React.Fragment key={singlePin._id}>
        <Pin data={singlePin}/>
      </React.Fragment>
    );
  });
};

export default PinList;
