import React, { useState } from "react";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

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
    <Map
      center={[51.505, -0.09]}
      zoom={13}
      onClick={handleAddMarker}
      style={{ height: "400px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {markers.map((marker, index) => (
        <Marker key={index} position={[marker.lat, marker.lng]}>
          <Popup>
            Marker {index + 1}: {marker.lat}, {marker.lng}
          </Popup>
        </Marker>
      ))}
    </Map>
  );
}

export default MapComponent;
