import React, { Component } from "react";
import { Map as LeafletMap, Marker, Popup, TileLayer } from "react-leaflet";
import { CircleMarker, Tooltip } from "react-leaflet";
import data from "./data.js";
// import "./Map.css";
import "leaflet/dist/leaflet.css";

function refreshButton(props) {
  return (
    <button className="refreshButton" onClick={props.onClick}>
      refresh
    </button>
  );
}

// Basic example from docs
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 41.389,
      lng: 2.16,
      zoom: 13
    };
  }

  handleRefresh(){
    const url = "http://localhost:5000/api/pushpins"

    fetch(url)
          .then(response => response.json())
          .then(data => {
            console.log(data)
          });


    data.city = [
      {
        description: "epaaaaa",
        coordinates: [2.20268, 41.384668],
        event_count: 10
      }
    ]
  }

  // source: https://stackoverflow.com/questions/41660648/make-react-leaflet-map-component-resize-itself-to-fit-available-space
  updateDimensions() {
    const height = window.innerWidth >= 992 ? window.innerHeight : 400;
    this.setState({ height: height / 2, width: height * 1.5 });
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
      <div>
      <button onClick={this.handleRefresh}>
        Click me!
      </button>
      <LeafletMap
        center={position}
        zoom={this.state.zoom}
        style={{ height: this.state.height }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />

        {data.city.map((city, k) => {
          return (
            <CircleMarker
              key={k}
              center={[city["coordinates"][1], city["coordinates"][0]]}
              radius={20 * Math.log(city["event_count"])}
              fillOpacity={0.5}
              stroke={false}
            >
              <Tooltip direction="right" offset={[-8, -2]} opacity={1}>
                <span>
                  {"Evento:" +
                    city["description"] +
                    " -- " +
                    "Number of events:" +
                    " " +
                    city["event_count"]}
                </span>
              </Tooltip>
            </CircleMarker>
          );
        })}
      </LeafletMap>
      </div>
    );
  }
}

export default Map; // ?

// ReactDOM.render(<MapExample />, document.getElementById("container"));
