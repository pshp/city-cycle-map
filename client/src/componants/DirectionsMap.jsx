import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import * as turf from '@turf/turf';
import DirectionsIcon from '@mui/icons-material/Directions';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import { getPins } from '../services/api-service';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

const formatClearances = (data) => {
  const arr = data.map((el) => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [el.longitude, el.latitude],

    },
    properties: {
      clearance: "13' 2",
    },
  }));
  return {
    type: 'FeatureCollection',
    features: arr,
  };
};

function DirectionsMap({
  handleClickDirections, latStore, lngStore, zoomStore, pins,
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(lngStore);
  const [lat, setLat] = useState(latStore);
  const [zoom, setZoom] = useState(zoomStore);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom,
    });

    // add directions box
    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving',
      alternatives: 'false',
      geometries: 'geojson',
    });

    map.current.addControl(directions, 'top-left');

    // add hazard layer on load
    map.current.on('load', () => {
      map.current.addControl(new mapboxgl.ScaleControl());
      map.current.addControl(new mapboxgl.NavigationControl());

      const clearances = formatClearances(pins);
      console.log(pins);
      console.log(clearances);

      const obs = turf.buffer(clearances, 0.03, { units: 'kilometers' });

      map.current.addLayer({
        id: 'clearances',
        type: 'fill',
        source: {
          type: 'geojson',
          data: obs,
        },
        layout: {},
        paint: {
          'fill-color': '#f03b20',
          'fill-opacity': 0.5,
          'fill-outline-color': '#f03b20',
        },
      });
    });

    // add scroll zoom
    map.current.scrollZoom.enable();
  }, []);

  // const handleClickDirections = () => {
  //   map.current.addLayer({
  //     id: 'clearances',
  //     type: 'fill',
  //     source: {
  //       type: 'geojson',
  //       data: obstacle,
  //     },
  //     layout: {},
  //     paint: {
  //       'fill-color': '#f03b20',
  //       'fill-opacity': 0.5,
  //       'fill-outline-color': '#f03b20',
  //     },
  //   });
  // };

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <DirectionsIcon
        onClick={handleClickDirections}
        fontSize="large"
        id="direct"
        className="directions"
      />
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default DirectionsMap;
