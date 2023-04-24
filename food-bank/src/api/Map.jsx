import React, { useState } from 'react';
import './App.css';
import Map from "./Map";
import { Layers, TileLayer, VectorLayer } from "./Layers";
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { osm, vector } from "./Source";
import { fromLonLat, get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import { Controls, FullScreenControl } from "./Controls";

let styles = {
  'MultiPolygon': new Style({
    stroke: new Stroke({
      color: 'blue',
      width: 1,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
  }),
};
const geojsonObject = { ... }; // see full geojson object in Github
const geojsonObject2 = { ... }; // see full geojson object in Github
const MapComponent = () => {
  const [center, setCenter] = useState([-94.9065, 38.9884]);
  const [zoom, setZoom] = useState(9);
  const [showLayer1, setShowLayer1] = useState(true);
  const [showLayer2, setShowLayer2] = useState(true);
return (
  <div>
    <Map center={fromLonLat(center)} zoom={zoom}>
      <Layers>
        <TileLayer
          source={osm()}
          zIndex={0}
        />
        {showLayer1 && (
          <VectorLayer
            source={vector({ features: new GeoJSON().readFeatures(geojsonObject, { featureProjection: get('EPSG:3857') }) })}
            style={styles.MultiPolygon}
          />
        )}
        {showLayer2 && (
          <VectorLayer
            source={vector({ features: new          GeoJSON().readFeatures(geojsonObject2, { featureProjection:               get('EPSG:3857') }) })}
            style={styles.MultiPolygon}
          />
        )}
      </Layers>
      <Controls>
        <FullScreenControl />
      </Controls>
    </Map>
    <div>
      <input
        type="checkbox"
        checked={showLayer1}
        onChange={event => setShowLayer1(event.target.checked)}
      /> Johnson County
    </div>
    <div>
      <input
        type="checkbox"
        checked={showLayer2}
        onChange={event => setShowLayer2(event.target.checked)}
      /> Wyandotte County</div>
    </div>
  );
}
export default MapComponent;
/*import React, { useState } from "react";
import { MapContainer as Map, TileLayer, Marker, Popup } from "react-leaflet";
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack } from "@chakra-ui/react";
import "../css/Map.css"

function MapComponent() {
  const [markers, setMarkers] = useState([]);

  // function to add a new marker to the map
  function handleAddMarker(e) {
    const { lat, lng } = e.latlng;
    const newMarker = {
      lat: lat,
      lng: lng,
    };
    setMarkers([...markers, newMarker]);
  }

  return (
    <Box className="MapContainer">
      <Map
        center={[33.753746, -84.386330]}
        zoom={13}
        onClick={(e) => handleAddMarker(e)}
        style={{ height: "400px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers.map((marker, index) => (
          <Marker key={index} position={[marker.lat, marker.lng]} >
            <Popup>
              Marker {index + 1}: {marker.lat}, {marker.lng}
            </Popup>
          </Marker>
        ))}
      </Map>
    </Box>
  );
}

export default MapComponent;*/