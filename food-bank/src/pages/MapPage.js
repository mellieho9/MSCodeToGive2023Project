import React from "react";
import MapComponent from "../api/Map";
import "../css/Map.css"


function MapPage() {
  return (
    <div>
      <link
  rel="stylesheet"
  href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
  integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
  crossorigin=""
/>
      <h1 className="check-your-status">Check your status!</h1>
      <div className="order-line">
        <label form="order-form" className="label-form">Order Number:</label>
        <input form="order-form" className="label-input" type="text"></input>
      </div>
      <MapComponent/>

    </div>
  );
}

export default MapPage;
