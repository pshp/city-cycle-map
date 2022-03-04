import { getPins } from "../services/api-service";

import React, { useRef, useEffect, useState } from "react";
import { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Pin from "./Pin";

const PinList = () => {
  const [pinArray, setPinArray] = useState([]);

  useEffect(() => {
    getPins()
      .then((pins) => setPinArray(pins))
      .catch((e) => console.log(e));
  }, []);

  return pinArray.map((singlePin) => {
    return (
      <React.Fragment key={singlePin._id}>
        <Pin data={singlePin} />
      </React.Fragment>
    );
  });
};

export default PinList;
