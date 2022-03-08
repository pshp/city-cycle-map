import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import 'mapbox-gl/dist/mapbox-gl.css';
import * as turf from '@turf/turf';
import DirectionsIcon from '@mui/icons-material/Directions';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import './DirectionsMap.css';

const polyline = require('@mapbox/polyline');

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX;

function DirectionsMap({
  handleClickDirections, latStore, lngStore, zoomStore, obstacle,
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const [showDirections, setShowDirections] = useState(null);

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lngStore, latStore],
      zoom: zoomStore,
    });

    // add hazard layer on load
    map.current.on('load', () => {
      map.current.addControl(new mapboxgl.ScaleControl());
      map.current.addControl(new mapboxgl.NavigationControl());

      map.current.addLayer({
        id: 'clearances',
        type: 'fill',
        source: {
          type: 'geojson',
          data: obstacle,
        },
        layout: {},
        paint: {
          'fill-color': '#f03b20',
          'fill-opacity': 0.5,
          'fill-outline-color': '#f03b20',
        },
      });

      for (let i = 0; i < 3; i += 1) {
        map.current.addSource(`route${i}`, {
          type: 'geojson',
          data: {
            type: 'Feature',
          },
        });

        map.current.addLayer({
          id: `route${i}`,
          type: 'line',
          source: `route${i}`,
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#cccccc',
            'line-opacity': 0.5,
            'line-width': 13,
            'line-blur': 0.5,
          },
        });
      }
    });

    // add scroll zoom
    map.current.scrollZoom.enable();

    // add directions box
    const directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/cycling',
      alternatives: 'false',
      geometries: 'geojson',
      controls: {
        instructions: false,
      },
    });
    map.current.addControl(directions, 'top-left');

    directions.on('route', (event) => {
      setShowDirections(true);
      const reports = document.getElementById('reports');
      reports.innerHTML = '';
      const report = reports.appendChild(document.createElement('div'));
      // Add IDs to the routes
      const routes = event.route.map((route, index) => ({
        ...route,
        id: index,
      }));

      for (let i = 0; i < 3; i += 1) {
        map.current.setLayoutProperty(`route${i}`, 'visibility', 'none');
      }

      routes.forEach((route) => {
        // Make each route visible, by setting the opacity to 50%.
        map.current.setLayoutProperty(`route${route.id}`, 'visibility', 'visible');

        // Get GeoJSON LineString feature of route
        const routeLine = polyline.toGeoJSON(route.geometry);

        // Update the data for the route, updating the visual.
        map.current.getSource(`route${route.id}`).setData(routeLine);
        const isClear = turf.booleanDisjoint(obstacle, routeLine) === true;

        const collision = isClear ? 'is good!' : 'is bad.';
        const emoji = isClear ? '✅' : '⚠️';
        // const detail = isClear ? 'does not go' : 'goes';
        report.className = isClear ? 'item' : 'item warning';

        if (isClear) {
          map.current.setPaintProperty(`route${route.id}`, 'line-color', '#74c476');
        } else {
          map.current.setPaintProperty(`route${route.id}`, 'line-color', '#de2d26');
        }

        // Add a new report section to the sidebar.
        // Assign a unique `id` to the report.
        report.id = `report-${route.id}`;

        // Add the response to the individual report created above.
        const heading = report.appendChild(document.createElement('h3'));

        // Set the class type based on clear value.
        heading.className = isClear ? 'clear' : 'warning';

        heading.innerHTML = `${emoji} Route ${route.id + 1} ${collision}`;

        // Add details to the individual report.
        // const details = report.appendChild(document.createElement('p'));
        // details.innerHTML = `This route ${detail} through a hazard.`;
        report.appendChild(document.createElement('hr'));
      });
    });
  }, []);

  return (

    <div>
      <DirectionsIcon
        onClick={handleClickDirections}
        fontSize="large"
        id="direct"
        className="directions"
      />
      <div ref={mapContainer} className="map-container" />
      {showDirections && (
      <div className="sidebar">
        <div className="heading">
          Routes
        </div>
        <div id="reports" className="reports" />
      </div>
      )}
    </div>
  );
}

export default DirectionsMap;
