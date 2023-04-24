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

        new VectorLayer({
          source: new VectorSource({
            features: [
              new Feature({
                geometry: new Point(fromLonLat([20, 20])),
                name: "Marker",
              }),
            ],
          }),
          style: new Style({
            image: new iconOL({
              anchor: [0.5, 46],
              anchorXUnits: 'fraction',
              anchorYUnits: 'pixels',
              src: 'https://openlayers.org/en/latest/examples/data/icon.png',
            }),
          }),
        }),
      ],
      

      view: new View({
        center: fromLonLat([20, 20]),
        zoom: 15,
      }),
    });

    // add marker
    const markerSource = new VectorSource({
      features: [
        new Feature({
          geometry: new Point(fromLonLat([20, 20])),
        })
      ]
    });

    const markerLayer = new VectorLayer({
      source: markerSource,
      style: new Style({
        image: new iconOL({
          src: '/path/to/your/marker-image.png',
          anchor: [0.5, 1]
        })
      })
    });

    initialMap.addLayer(markerLayer);
    setMap(initialMap);

    return () => {
      initialMap.dispose();
    };
  }, []);


  return <div id="map-container" className="map" style={{ height: '400px', width:'50%', margin: "0 auto",}} />;
};


export default MapComponent;
