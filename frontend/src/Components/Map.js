import React, { Component, createRef } from "react";
import { Map as LeafletMap, Marker, Popup, TileLayer } from "react-leaflet";
import { CircleMarker, Tooltip } from "react-leaflet";
import emptyData from "./data.js";
import { Button, FormGroup, Input } from "reactstrap";
// import "./Map.css";
import "leaflet/dist/leaflet.css";
import { randomBytes } from "crypto";

// function refreshButton(props) {
//   return (
//     <button className="refreshButton" onClick={props.onClick}>
//       refresh
//     </button>
//   );
// }

// Basic example from docs
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: emptyData,
      lat: 41.389,
      lng: 2.16,
      marker_lat: 41.389,
      marker_lng: 2.16,
      zoom: 13,
      type: "",
      description: "",
      coords: [],
      event_count: Math.floor(Math.random() * 10) + 5
    };
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleRefresh() {
    const url = "http://104.248.38.192:8000/type"; // "http://localhost:5000/api/pushpins"
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

  handleClick(id) {
    console.log(id);
    let newData = this.state.data;
    newData.city[id].event_count++;
    this.setState({
      data: newData
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

  updateType = e => {
    this.setState({
      type: e.target.value
    });
  };
  updateDescription = e => {
    this.setState({
      description: e.target.value
    });
  };
  updateCoords = e => {
    const coords = e.latlng;
    console.log(coords);
    this.setState({
      marker_lat: parseFloat(coords.lat.toFixed(3)),
      marker_lng: parseFloat(coords.lng.toFixed(3))
    });
    console.log(typeof this.state.marker_lat);
  };
  postPushPin = () => {
    const PushPin = {
      type: this.state.type,
      description: this.state.description,
      coords: [this.state.marker_lng, this.state.marker_lat],
      event_count: this.state.event_count
    };
    console.log(PushPin);
    const url = "http://104.248.38.192:8000/newpin"; // "https://localhost:5000/api/pushpins";

    fetch(url, {
      method: "POST",
      body: JSON.stringify(PushPin)
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error("Error: ", err);
      });
  };

  render() {
    //init state
    const position = [this.state.lat, this.state.lng];
    return (
      <div>
        <div
          className="menu-map"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "stretch",
            alignItems: "stretch",
            backgroundColor: "#dedede"
          }}
        >
          <Button className="refresh-button" onClick={this.handleRefresh}>
            Refresh
          </Button>
          <FormGroup
            style={{
              display: "inline-block",
              width: "20%",
              margin: "0 0 0 4rem"
            }}
          >
            <Input
              onChange={this.updateType}
              type="select"
              name="select"
              id="exampleSelect"
            >
              <option value="voluntary-manslaughter">
                Voluntary Manslaughter
              </option>
              <option value="kidnapping">kidnapping</option>
              <option value="burglary">Burglary</option>
              <option value="child-abuse">Child Abuse</option>
              <option value="rape">Rape</option>
              <option value="homicide">Homicide</option>
              <option value="theft">Theft</option>
              <option value="shoplifting">Shoplifting</option>
              <option value="vandalism">Vandalism</option>
              <option value="sexual-assault">Sexual Assault</option>
              <option value="drug-traffickin">Drug Traffickin</option>
              <option value="fraud">Fraud</option>
              <option value="public-intoxication">Public Intoxication</option>
              <option value="disturbing-the-peace">Disturbing the Peace</option>
              <option value="extortion">Extortion</option>
              <option value="justificable-homicide">
                Justificable Homicide
              </option>
              <option value="drug-possession">Drug Possession</option>
            </Input>
          </FormGroup>
          <Input
            onChange={this.updateDescription}
            type="textarea"
            name="text"
            id="exampleText"
            placeholder="Description of the event..."
            style={{
              display: "inline-block",
              width: "30%",
              height: "4rem",
              resize: "none"
            }}
          />
          <div style={{ marginLeft: "0.5rem" }}>
            <p style={{ marginBottom: "0" }}>
              Click on the map to set the coordinates:
            </p>
            <span>Lon:</span>
            <Input
              readOnly
              value={this.state.marker_lng}
              style={{
                display: "inline-block",
                width: "25%",
                marginRight: "0.5rem"
              }}
            ></Input>
            <span>Lat:</span>
            <Input
              readOnly
              value={this.state.marker_lat}
              style={{ display: "inline-block", width: "25%" }}
            ></Input>
          </div>
          <Button
            onClick={this.postPushPin}
            color="success"
            style={{ padding: "0 3rem" }}
          >
            Post!
          </Button>
        </div>

        <LeafletMap
          center={position}
          zoom={this.state.zoom}
          //style={{ height: this.state.height }}
          onClick={this.updateCoords}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />

          {this.state.data.city.map((hotspot, k) => {
            return (
              <CircleMarker
                key={k}
                center={[hotspot["coords"][0], hotspot["coords"][1]]}
                radius={10 * Math.log(hotspot["event_count"]) + 15}
                fillOpacity={0.5 * (Math.log(hotspot["event_count"]) + 0.2)}
                color={"red"}
                stroke={false}
                onClick={() => this.handleClick(k)}
              >
                <Tooltip direction="right" offset={[-8, -2]} Opacity={1}>
                  <span>
                    {hotspot["description"] +
                      " - Verification count: " +
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
