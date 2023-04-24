import React, { useEffect, useState, useRef } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Heading, Icon, Input, Stack } from "@chakra-ui/react";
import {FaMapMarkerAlt, FaTrashAlt} from "react-icons/fa";


import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import OSM from "ol/source/OSM";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj";
import { Icon as iconOL, Style } from "ol/style";


import "../css/Map.css"


function MapComponent() {
  const [map, setMap] = useState();
  const [marker, setMarker] = useState([]);
 
  const mapRef = useRef(null);


  //initial map here
  useEffect(() => {
    const initialMap = new Map({
      target: 'map-container',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        }),
      ],


      view: new View({
        center: fromLonLat([-84.386330, 33.753746]),
        zoom: 15,
      }),
    });


    setMap(initialMap);
    return () => initialMap.dispose();
  }, []);


  return <div id="map-container" className="map" style={{ height: '400px', width:'50%', margin: "0 auto",}} />;
};


export default MapComponent;

