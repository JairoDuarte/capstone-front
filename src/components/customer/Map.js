/*global google*/
import React, { Component } from "react";
import { withGoogleMap, DirectionsRenderer, GoogleMap, Marker } from "react-google-maps";
import { Header, Segment, Portal } from 'semantic-ui-react';
const { MarkerWithLabel } = require("react-google-maps/lib/components/addons/MarkerWithLabel");
var image = '/assets/icon/directions.svg'
const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={5}
    defaultCenter={{lat: 41.85, lng: -117.65}}
  >
  
  {props.directions && <DirectionsRenderer directions={props.directions} suppressMarkers={props.markers} />}
  {props.isMarkerShown && <Marker icon={image} position={{ lat: props.location[0], lng: props.location[1] }} />}
  </GoogleMap>
));

export default class Map extends Component {
  state = {directions: {}, value: 0, open: true, markers:{}, distance: {}, duration: {}, coordinatesFrom: [0,0], coordinatesTo: [0,0]}
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
                coordinatesFrom: this.props.from.coordinates,
                coordinatesTo: this.props.to.coordinates
            })
            if(!this.props.myskhera)this.props.setDistance(this.state.distance.text);
        } else {
            console.error(`error fetching directions ${result}`);
        }
    });
  }
  render() {
    let time = this.state.duration.text + ' ';
    const duration = () => time.split(' ')[0]
    return (
      <div style={{height: `500px`}}>
        <GettingStartedGoogleMap
          directions={this.state.directions}
          markers={this.state.markers}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          onMapLoad={this.handleMapLoad}
          location={this.props.from.coordinates}
          isMarkerShown={this.props.isMarkerShown || false}
        >
        
        </GettingStartedGoogleMap>
        {!this.props.myskhera ?
        <Portal  open={this.state.open}>
            <Segment
            raised={true}
              style={{
                left: '62%',
                position: 'absolute',
                top: '52em',
                zIndex: 1000,
              }}
            >
              <tr>
                <th style={{ padding: '0em 0em', marginRight: '10em'}}>
                <Header textAlign='left' style={{ fontFamily: "Ropa Sans", marginLeft: '0em', fontSize: "24px", fontWeight: "normal", }}>Estimated Price</Header>
                <div style={{ textAlign:'left', marginTop: '-1em', fontSize: "14px", fontWeight: "normal"}}>Estimated time and distance</div>
                
                </th>
                <th style={{ width:'150px'}}>
                <Header color='green' textAlign='right' style={{ fontFamily: "Ropa Sans", marginLeft: '0em', fontSize: "24px", fontWeight: "normal", }}>{this.props.estimatedprice}</Header>
                <div style={{ textAlign:'right', marginTop: '-1em', fontSize: "14px", fontWeight: "normal"}}>~{duration()} min / {this.state.distance.text}</div>
                
                </th>
              </tr>
            </Segment>
          </Portal> : <> </>
        }
      </div>
     );
   }
 }