import React from "react";
import "./App.css";
import Map from "./Components/Map";
// import "leaflet/dist/leaflet.css";
import Button from "./Components/Button";

function App() {
  return (
    <div className="body">
      <Map class='map'/>

      <div class='menu-bar'>
        <Button />
      </div>
    </div>
  );
}

export default App;
