import React, { useState } from "react";
import { MapContainer as Map, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { Box, Button, Flex, FormControl, FormLabel, Heading, Icon, Input, Stack } from "@chakra-ui/react";
import {FaMapMarkerAlt, FaTrashAlt} from "react-icons/fa";
import "../css/Map.css"

function MapComponent() {
  const [markers, setMarkers] = useState([]);
  const [creatingMarker, setCreateMarkers] = useState(null);

  //function click on a button
  function clickButton() {
    setCreateMarkers(!creatingMarker);
  }

  // function to click on the map
  function ClickHandler({ creatingMarker }) {
    const map = useMapEvents ({
      click: (e) => {
        if (creatingMarker) {
          handleAddMarker(e);
        }
      }
    });
    return null;
  }

  // function to add a new marker to the map
  function handleAddMarker(e) {
    const { lat, lng } = e.latlng;
    console.log("ok");
    const newMarker = {
      lat: lat,
      lng: lng,
    };
    setMarkers([...markers, newMarker]);
  }

  // function to delete a marker with pop up
  function handleDeleteMarker(index) {
    const newMarkers = [...markers];
    newMarkers.splice(index, 1);
    setMarkers(newMarkers);
  }

  return (
      <Box className="MapContainer">
        <button className="create-marker-button" onClick={clickButton}>
            {creatingMarker ? 'Cancel Marker' : 'Create Marker'}
        </button>
        <Map
          center={[33.753746, -84.386330]}
          zoom={13}
          // onClick={(e) => handleAddMarker(e)} // this one not working
          style={{ height: "400px" }}
        >
          <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
          />  
          <ClickHandler creatingMarker={creatingMarker} />
          {markers.map((marker, index) => (
            <Marker key={index} position={[marker.lat, marker.lng]}>
              <Popup>
                <div>
                  Marker {index + 1}: {marker.lat}, {marker.lng}
                  <Button mt="iem" onClick={ () => handleDeleteMarker(index)}>
                    <Icon as={FaTrashAlt} margin="10px" > Delete Marker </Icon>
                  </Button>
                </div>
              </Popup>
            </Marker>
          ))}
        </Map>
      </Box>
  );
}

export default MapComponent;