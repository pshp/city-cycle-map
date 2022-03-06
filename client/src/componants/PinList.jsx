import React, { useContext } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Pin from "./Pin";
import { MyContext } from "../context";
import NewPin from "./NewPin";

const PinList = ({ pinArray }) => {
  const { newPlace } = useContext(MyContext);

  const allPins = pinArray.map((singlePin) => {
    return (
      <React.Fragment key={singlePin._id}>
        <Pin data={singlePin} />
      </React.Fragment>
    );
  });

  return (
    <>
      <>{allPins}</>
      {newPlace && <NewPin></NewPin>}
    </>
  );
};

export default PinList;
