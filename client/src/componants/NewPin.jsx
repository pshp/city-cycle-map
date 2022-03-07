import React, { useContext } from 'react';
import { Marker } from 'react-map-gl';
import Room from '@mui/icons-material/Room';
import './Pin.css';
import MyContext from '../context';
import EditInfoBox from './EditInfoBox';

function NewPin() {
  const { zoom, newPlace } = useContext(MyContext);
  const { lat } = newPlace;
  const { lng } = newPlace;

  return (
    <>
      <Marker
        longitude={lng}
        latitude={lat}
        anchor="bottom"
        draggable="true"
        offset={[0, 0.8 * zoom]}
      >
        <Room
          style={{
            color: '#009cb8',
            fontSize: 30,
          }}
        />
      </Marker>
      <EditInfoBox lng={lng} lat={lat} />
    </>
  );
}

export default NewPin;
