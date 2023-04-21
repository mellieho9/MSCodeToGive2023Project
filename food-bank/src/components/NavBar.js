import React from "react";
import { Link } from "react-router-dom";
import "./../css/NavBar.css";

function NavBar() {
  return (
    <nav className="NavBar">
      <Link to="/" className="NavButton">Home</Link>
      <Link to="/order" className="NavButton">Order</Link>
      <Link to="/feedback" className="NavButton">Feedback</Link>
      <Link to="/delivery-status" className="NavButton">Delivery Status</Link>
      <Link to="/map" className="NavButton">Map</Link>
      <Link to="/inventory" className="NavButton">Inventory</Link>
      <Link to="/calendar" className="NavButton">Calendar</Link>
    </nav>
  );
}

export default NavBar;
