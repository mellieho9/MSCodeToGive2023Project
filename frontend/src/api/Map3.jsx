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
                geometry: new Point(fromLonLat([ -84.1929, 31.5668])),
                name: "Marker 1",
              }),
              new Feature({
                geometry: new Point(fromLonLat([-84.4013, 31.6981])),
                name: "Marker 2",
              }),
              new Feature({
                geometry: new Point(fromLonLat([-84.0266, 31.7184 ])),
                name: "Marker 3",
              }),
              new Feature({
                geometry: new Point(fromLonLat([-84.1566, 31.3477])),
                name: "Marker 4",
              }),
              new Feature({
                geometry: new Point(fromLonLat([ -84.3937, 31.5085 ])),
                name: "Marker 5",
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

        new VectorLayer({
          source: new VectorSource({
            features: [
              new Feature({
                geometry: new LineString([
                    fromLonLat([-84.1929, 31.5668]), 
                    fromLonLat([-84.4013, 31.6981]), 
                    fromLonLat([-84.0266, 31.7184]), 
                    fromLonLat([-84.1566, 31.3477]), 
                    fromLonLat([-84.3937, 31.5085])
                ]),
              }),
            ],
          }),
          style: new Style({
            stroke: new Stroke({
              color: "red",
              width: 2,
            }),
          }),
        }),
      ],

      view: new View({
        center: fromLonLat([-84.0266, 31.7184]),
        zoom: 10,
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