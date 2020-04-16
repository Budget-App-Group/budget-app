import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

import './map.scss'

class Maps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
    };
  }

  componentDidMount() {
    this.setState({
      location: this.props.place,
    });
  }

  render() {
    const { latitude, longitude } = this.state.location;
    return (
      <div className="google-map-box">
        <Map
          className="google-map"
          style={{ 
            width: "100%", 
            height: "150px",
            borderRadius: "10px",
            border: "solid 5px white",
            boxShadow: "darkgreen 0 0 5px",
            margin: "0 auto"
          }}
          google={this.props.google}
          center={{
            lat: latitude ? latitude : 0,
            lng: longitude ? longitude : 0,
          }}
          zoom={15}
        >
          <Marker
            position={{
              lat: latitude ? latitude : 0,
              lng: longitude ? longitude : 0,
            }}
          />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyBfVb61LDhKD-E3rz0Ko6NHXpCBWo_Q88c",
})(Maps);
