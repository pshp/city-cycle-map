import { getPins } from "../services/api-service";

import React, { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Pin from "./Pin";

const PinList = ({zoom}) => {
  const [pinArray, setPinArray] = useState([]);

  useEffect(() => {
    getPins()
      .then((pins) => {
        setPinArray(pins);
        console.log(pins);
      })
      .catch((e) => console.log(e));
  }, []);

  return pinArray.map((singlePin) => {
    return (
      <React.Fragment key={singlePin._id}>
        <Pin size={20} data={singlePin} zoom={zoom} />
      </React.Fragment>
    );
  });
};

export default PinList;
