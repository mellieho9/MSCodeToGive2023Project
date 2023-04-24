import React, { useEffect, useState, useRef } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Heading, Icon, Input, Stack } from "@chakra-ui/react";
import { FaMapMarkerAlt, FaTrashAlt } from "react-icons/fa";

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import OSM from "ol/source/OSM";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";
import { fromLonLat } from "ol/proj";
import { Icon as iconOL, Style, Stroke } from "ol/style";

import "../css/Map.css";

function MapComponent() {
  const [map, setMap] = useState();
  const [marker, setMarker] = useState([]);

  const mapRef = useRef(null);

  useEffect(() => {
    const initialMap = new Map({
      target: "map-container",
      layers: [
        new TileLayer({
          source: new XYZ({
            url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
          }),
        }),

        new VectorLayer({
          source: new VectorSource({
            features: [
              new Feature({
                geometry: new Point(fromLonLat([ -81.0912, 32.0809])),
                name: "Marker 1",
              }),
              new Feature({
                geometry: new Point(fromLonLat([-81.6083, 31.5469])),
                name: "Marker 2",
              }),
              new Feature({
                geometry: new Point(fromLonLat([-82.2190, 31.1688])),
                name: "Marker 3",
              }),
             
            ],
          }),
          style: new Style({
            image: new iconOL({
              anchor: [0.5, 46],
              anchorXUnits: "fraction",
              anchorYUnits: "pixels",
              src: "https://openlayers.org/en/latest/examples/data/icon.png",
            }),
          }),
        }),

      ],

      view: new View({
        center: fromLonLat([-81.6083, 31.5469]),
        zoom: 9,
      }),
    });

    setMap(initialMap);

    return () => {
      initialMap.dispose();
    };
  }, []);

  return <div id="map-container" className="map" style={{ height: '600px', width:'100%', margin: "0 auto",}} />;
};


export default MapComponent;