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
                geometry: new Point(fromLonLat([ -83.57, 34.47])),
                name: "Marker 1",
              }),
              new Feature({
                geometry: new Point(fromLonLat([-84.42, 33.76 ])),
                name: "Marker 2",
              }),
              new Feature({
                geometry: new Point(fromLonLat([-83.83, 34.01 ])),
                name: "Marker 3",
              }),
              new Feature({
                geometry: new Point(fromLonLat([-84.67,34.06 	])),
                name: "Marker 4",
              }),
              new Feature({
                geometry: new Point(fromLonLat([ -82.57, 32.19 ])),
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
                  fromLonLat([	-83.57, 34.47]),
                  fromLonLat([	-84.42, 33.76 ]),
                  fromLonLat([-83.83, 34.01]),
                  fromLonLat([	-84.67,34.06 ]),
                  fromLonLat([-82.57, 32.19]),
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
        center: fromLonLat([-98.5795, 39.8283]),
        zoom: 4,
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