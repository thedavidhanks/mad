import React from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import { iconCricket } from './map/icons/icons.js';
import 'leaflet/dist/leaflet.css';

//Marker will show where the cricket currently is.
const CricketMarker = props =>{
    var coords = [props.lat,props.long];
    return <Marker icon={iconCricket} position={coords}><Popup><p>{props.time}</p></Popup></Marker>;
};

class TravelMap extends React.Component {
    constructor(){
      super();
      this.state = {
          cricketLoc: null,
          lat: 29.7,
          lng: -95.37,
          zoom: 8,
          height: 800
      };  
    }
    
    //update's map div height based on window size.
    updateDimensions() {
        //note: "-40" accounts for the menubar at the top
        const height = window.innerWidth >= 992 ? window.innerHeight -40 : 400;
        this.setState({ height: height });
    }
    
    //call the the tracker database to get the current location
    fetchCurrentLocation = () =>{
        fetch('http://tdh-scripts.herokuapp.com/gps-tracker/?request=latest')
            .then(response => response.json())
            .then(cricketLoc => this.setState({cricketLoc}));   
        console.log('location updated');
    }
    
    componentDidMount(){
        let refreshLocSec = 15; //specifies the seconds between calls to fetch the current cricket location.
        console.log('Refreshing location every '+refreshLocSec+' seconds');
        this.fetchCurrentLocation();
        this.timer = setInterval(()=>this.fetchCurrentLocation(), refreshLocSec*1000);
        
        //check the screen size.
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }
    render() {
//        const overstyle = {
//            width: '100%',
//            height: {this.state.height}
//        };
        const position = [this.state.lat, this.state.lng];
        return (
                <Map center={position} zoom={this.state.zoom} style={{ height: this.state.height, width: '100%' }}>
                    <TileLayer
                      attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    { (this.state.cricketLoc) ? 
                        <CricketMarker lat={this.state.cricketLoc.lat} long={this.state.cricketLoc.long} time={this.state.cricketLoc.date}/> 
                        : 
                        null
                    }
                </Map>
        );
    }
};
export default TravelMap