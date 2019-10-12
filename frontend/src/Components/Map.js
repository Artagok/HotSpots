import React, { Component } from "react";
import { Map as LeafletMap, Marker, Popup, TileLayer } from "react-leaflet";
import { CircleMarker } from "react-leaflet";
import data from "./data.js";
// import "./Map.css";
import "leaflet/dist/leaflet.css";

// Basic example from docs
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 41.389,
      lng: 2.16,
      zoom: 16
    };
  }

  // source: https://stackoverflow.com/questions/41660648/make-react-leaflet-map-component-resize-itself-to-fit-available-space
  updateDimensions() {
    const height = window.innerWidth >= 992 ? window.innerHeight : 400;
    this.setState({ height: height });
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <LeafletMap
        center={position}
        zoom={this.state.zoom}
        style={{ height: this.state.height }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />

        {data.city.map(city => {
          return (
            <CircleMarker
              center={[city["coordinates"][1], city["coordinates"][0]]}
            />
          );
        })}

        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </LeafletMap>
    );
  }
}

export default Map; // ?

// ReactDOM.render(<MapExample />, document.getElementById("container"));
