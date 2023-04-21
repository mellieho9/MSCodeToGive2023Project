import React from "react";
import MapComponent from "../api/Map";
import "../css/Map.css"


function MapPage() {
  return (
    <div>
      <h1>Welcome to the Map Page!</h1>
      <p>
        This page features a map component that allows you to add markers to the
        map by clicking on it.
      </p>
      <MapComponent />
    </div>
  );
}

export default MapPage;
