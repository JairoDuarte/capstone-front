/*global google*/
import React, { Component } from "react";
import { withGoogleMap, DirectionsRenderer, GoogleMap } from "react-google-maps";

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={5}
    defaultCenter={{lat: 41.85, lng: -117.65}}
  >
  {props.directions && <DirectionsRenderer directions={props.directions} suppressMarkers={props.markers} />}
  </GoogleMap>
));

export default class Map extends Component {
  state = {directions: {}, markers:{}, distance: {}, duration: {}, coordinatesFrom: {}, coordinatesTo: {}}
  handleMapLoad = this.handleMapLoad.bind(this);

  componentDidMount(){
      this.handleMapLoad();
      this.interval = setInterval(() => this.mapUpdate(), 5000);
  }
  mapUpdate = () =>{
    if (this.props.from.coordinates[0] !== this.state.coordinatesFrom[0] || this.props.from.coordinates[1] !== this.state.coordinatesFrom[1] || this.props.to.coordinates[0] !== this.state.coordinatesTo[0] || this.props.to.coordinates[1] !== this.state.coordinatesTo[1] ) {
      this.handleMapLoad();
    }
  }


  handleMapLoad() {

    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route({
      origin: new google.maps.LatLng(this.props.from.coordinates[0], this.props.from.coordinates[1]),
      destination: new google.maps.LatLng(this.props.to.coordinates[0], this.props.to.coordinates[1]),
        travelMode: google.maps.TravelMode.DRIVING,
    }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            this.setState({
                directions: { ...result },
                markers: true,
                distance: result.routes[0].legs[0].distance,
                duration: result.routes[0].legs[0].duration,
                coordinates: this.props.from.coordinates
            })
        } else {
            console.error(`error fetching directions ${result}`);
        }
    });
  }
  render() {
           
    return (
      <div style={{height: `500px`}}>
        <GettingStartedGoogleMap
          directions={this.state.directions}
          markers={this.state.markers}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          onMapLoad={this.handleMapLoad}
        />
      </div>
     );
   }
 }