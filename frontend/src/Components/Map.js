import React, { Component, createRef } from "react";
import { Map as LeafletMap, Marker, Popup, TileLayer } from "react-leaflet";
import { CircleMarker, Tooltip } from "react-leaflet";
import emptyData from "./data.js";
import { Button, FormGroup, Input } from 'reactstrap';
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
  }

  handleRefresh() {
    const url = "http://104.248.38.192:8000/type"; // "http://localhost:5000/api/pushpins";
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

  updateType = e => {
    this.setState({
      type: e.target.value
    });
  }
  updateDescription = e => {
    this.setState({
      description: e.target.value
    });
  }
  updateCoords = e => {
    const coords = e.latlng;
    this.setState({
      marker_lat: coords.lat.toFixed(3),
      marker_lng: coords.lng.toFixed(3)
    });
  }
  render() {

    //init state
    const position = [this.state.lat, this.state.lng];
    return (
      <div>
        <div className="menu-map" style={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "stretch",
            alignItems: "stretch",
            backgroundColor: "#dedede"
        }}>
          <Button className='refresh-button' onClick={this.handleRefresh}>Refresh</Button>
          <FormGroup style={{ display: "inline-block",width: "20%", margin: "0 0 0 4rem" }}>
            <Input onChange={this.updateType} type="select" name="select" id="exampleSelect">
              <option value="Voluntary Manslaughter">Voluntary Manslaughter</option>
              <option value="Burglary">Burglary</option>
              <option value="Child Abuse">Child Abuse</option>
              <option value="Rape">Rape</option>
              <option value="Homicide">Homicide</option>
              <option value="Theft">Theft</option>
              <option value="Shoplifting">Shoplifting</option>
              <option value="Vandalism">Vandalism</option>
              <option value="Sexual Assault">Sexual Assault</option>
              <option value="Drug Traffickin">Drug Traffickin</option>
              <option value="Fraud">Fraud</option>
              <option value="Public Intoxication">Public Intoxication</option>
              <option value="Disturbing the Peace">Disturbing the Peace</option>
              <option value="Extortion">Extortion</option>
              <option value="Justificable Homicide">Justificable Homicide</option>
              <option value="Drug Possession">Drug Possession</option>
            </Input>
          </FormGroup>
          <Input 
            onChange={this.updateDescription}
            type="textarea" 
            name="text" 
            id="exampleText" 
            placeholder="Description of the event..." 
            style={{ display: "inline-block", width: "30%", height: "4rem", resize: "none" }} />
          <div style={{ marginLeft: "0.5rem"}}>
            <p style={{ marginBottom: "0"}}>Click on the map to set the coordinates:</p>
            <span>Lon:</span><Input readOnly value={this.state.marker_lng} style={{ display: "inline-block", width: "25%", marginRight: "0.5rem" }}></Input>
            <span>Lat:</span><Input readOnly value={this.state.marker_lat} style={{ display: "inline-block", width: "25%" }}></Input>
          </div>
          <Button color="success" style={{ padding: "0 3rem" }}>Post!</Button>
        </div>

        <LeafletMap
          center={position}
          zoom={this.state.zoom}
          style={{ height: this.state.height }}
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
