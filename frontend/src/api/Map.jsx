import React, { useState, useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import { Vector } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import { Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";
import { defaults as defaultControls, FullScreen } from 'ol/control';

const MapComponent = () => {
  const [marker, setMarker] = useState([]);
  const mapContainerRef = useRef(null);
  useEffect(() => {
    const fetchMarkers = async () => {
      const response = await fetch("http://127.0.0.1:5000/summary");
      const data = await response.json();
      
      const parsedData = data.map((item) => JSON.parse(item[0]));

      const markers = parsedData.map((item) => {
        if (!item.partner) return null;
        const { latitude, longitude, name } = item.partner;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}, Name: ${name}`);
        return new Feature({
          geometry: new Point(fromLonLat([longitude, latitude])),
          name,
        });
      }).filter((item) => item !== null); 

      const lineCoords = parsedData.map((item) => {
        const { latitude, longitude } = item.partner;
        return fromLonLat([longitude, latitude]);
      });

      const line = new Feature({
        geometry: new LineString(lineCoords),
      });

      setMarker([...markers, line]);

      const lineLayer = new VectorLayer({
        source: new Vector({
          features: [line],
        }),
        
      });
    };

    fetchMarkers();

  }, []);
  
  useEffect(() => {
    if (!mapContainerRef.current) {
      return;
    }

    const map = new Map({
      target: mapContainerRef.current,
      layers: [
        new TileLayer({
          source: new XYZ({
            url:
              "https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          }),
        }),
        new VectorLayer({
          source: new Vector({
            features: marker,
          }),
          style: new Style({
            image: new Icon({
              src: "https://openlayers.org/en/latest/examples/data/icon.png",
              scale: 0.90,
            }),
          }),
        }),
      ],
      view: new View({
        center: fromLonLat([-84.936, 34.485]),
        zoom: 12,
      }),
      controls: defaultControls().extend([
        new FullScreen(),
      ]),
    });
  }, [mapContainerRef, marker]);

  return <div ref={mapContainerRef} id="map-container" style={{ width: "100%", height: "400px" }}></div>;
};

export default MapComponent;
