import React, { useContext } from "react";
import { Marker } from "react-map-gl";
import Room from "@mui/icons-material/Room";
import "./Pin.css";
import { MyContext } from "../context";
import InfoBox from "./InfoBox";
import EditInfoBox from "./EditInfoBox";

const Pin = ({ data }) => {
  const { currentPinId, pinClick, zoom, editPlace } = useContext(MyContext);
  const lng = data.longitude;
  const lat = data.latitude;

  return (
    <div>
      <Marker
        longitude={lng}
        latitude={lat}
        anchor="bottom"
        draggable="true"
        onClick={() => {
          pinClick(data._id);
        }}
        offset={[0, 0.8 * zoom]}
      >
        <Room
          style={{
            color: "#FF6347",
            fontSize: 30,
          }}
        />
      </Marker>
      {!editPlace && currentPinId == data._id && (
        <>
          <InfoBox data={data} />
        </>
      )}
      {editPlace && currentPinId == data._id && (
        <>
          <EditInfoBox lng={lng} lat={lat} />
        </>
      )}
    </div>
  );
};

export default Pin;
