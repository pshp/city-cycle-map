import * as React from "react";
import Map, { Marker } from "react-map-gl";
import Room from "@mui/icons-material/Room";

function App() {
  const [zoom, setZoom] = React.useState(null);


  const onMapLoad = (map) => {
    setZoom(map.viewState.zoom);

  };
  return (
    <Map
      initialViewState={{
        longitude: 13.46094,
        latitude: 52.510509,
        zoom: 3.5,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={process.env.REACT_APP_MAPBOX}
      style={{ width: "100vw", height: "100vh" }}
      onZoom={ el => onMapLoad(el) }

    >
      <Marker longitude={13.46094} latitude={52.510509} anchor="bottom"
              offset={[0,0.6*zoom]}
            >
        <Room className="" style={{

           color: "slateblue",
           }} />
      </Marker>
    </Map>
  );
}

export default App;