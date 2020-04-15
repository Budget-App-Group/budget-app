import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

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
      <div className="google-map-box" style={{ position: "relative" }}>
        <Map
          className="google-map"
          style={{ width: "100%", height: "125px" }}
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
