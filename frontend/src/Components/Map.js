import React, { Component } from "react";
import { Map as LeafletMap, Marker, Popup, TileLayer } from "react-leaflet";
import { CircleMarker, Tooltip } from "react-leaflet";
import emptyData from "./data.js";
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
      data: emptyData,
      lat: 41.389,
      lng: 2.16,
      zoom: 13
    };
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  handleRefresh() {
    const url = "http://localhost:5000/api/pushpins";
    fetch(url)
      .then(response => response.json())
      .then(jsonData => {
        let newData = {};
        newData = { city: jsonData };
        console.log(this.state.data);
        console.log(newData);
        this.setState({
          data: newData
        });
      });
  }

  // source: https://stackoverflow.com/questions/41660648/make-react-leaflet-map-component-resize-itself-to-fit-available-space
  updateDimensions() {
    const height = window.innerWidth >= 992 ? window.innerHeight : 400;
    this.setState({ height: height / 2, width: height * 1.5 });
  }

  // componentWillMount() {
  //   this.updateDimensions();
  // }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this));
    this.handleRefresh();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    //init state
    const position = [this.state.lat, this.state.lng];
    return (
      <div>
        <button onClick={this.handleRefresh}>Refresh</button>

        <LeafletMap
          center={position}
          zoom={this.state.zoom}
          style={{ height: this.state.height }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />

          {this.state.data.city.map((hotspot, k) => {
            return (
              <CircleMarker
                key={k}
                center={[hotspot["coords"][1], hotspot["coords"][0]]}
                radius={20 * Math.log(hotspot["event_count"])}
                fillOpacity={0.5}
                stroke={false}
              >
                <Tooltip direction="right" offset={[-8, -2]} Opacity={1}>
                  <span>
                    {"Evento:" +
                      hotspot["description"] +
                      " -- " +
                      "Number of events:" +
                      " " +
                      hotspot["event_count"]}
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
