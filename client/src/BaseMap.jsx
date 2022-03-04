import React, { useEffect } from "react";
import ReactMapGL, { Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Pin from "./componants/Pin";
import RoomIcon from "@mui/icons-material/Room";
import Box from "./componants/Box";
import { getPins } from "./services/api.service";

const BaseMap = () => {
  const [pinList, setPinList] = useState([]);

  useEffect(() => {
    getPins()
      .then(pins => setPinList(pins))
      .catch(e => console.log(e))
  },[]);

  const allPins = pinList.map(singlePin => {
    return (
      <React.Fragment key={pin._id}>
        <Pin data={singlePin}/>
      </React.Fragment>
    )
  })

  return (
    <div className="Map">
      <ReactMapGL
        initialViewState={{
          longitude: 13.405,
          latitude: 52.52,
          zoom: 12,
        }}
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      >
        {allPins}
        <Box />
      </ReactMapGL>
    </div>
  );
};

export default BaseMap;
