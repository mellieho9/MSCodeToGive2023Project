import React, { useState } from "react";
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

export default MapComponent;