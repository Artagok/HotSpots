import React from "react";
import "./App.css";
import Map from "./Components/Map";
// import "leaflet/dist/leaflet.css";
import Button from "./Components/Button";

function App() {
  return (
    <div className="App">
      <Map />
      <Button style={{ position: "absolute" }} />
      {/* <Button /> */}
    </div>
  );
}

export default App;
