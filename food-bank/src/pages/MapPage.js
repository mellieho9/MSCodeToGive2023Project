import React from "react";
import MapComponent from "../api/Map";
import "../css/Map.css"


function MapPage() {
  return (
    <div className="MapContainer">
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
        integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
        crossorigin=""
      />
      <h1 className="h1">Welcome to the Map Page!</h1>
      <p>
        This page features a map component that allows you to add markers to the
        map by clicking on it.
      </p>
      <MapComponent />
    </div>
  );
}

export default MapPage;
