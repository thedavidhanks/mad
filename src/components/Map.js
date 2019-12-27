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
          zoom: 6,
          height: 800,
          centered: false
      };  
    }
    
    //update's map div height based on window size.
    updateDimensions() {
        //note: "-60" accounts for the menubar at the top
        const height = window.innerHeight - 60;
        this.setState({ height: height });
    }
    
    centerOnCricket = () =>{
        if(this.state.cricketLoc && !this.state.centered){
            this.setState({
                lat: this.state.cricketLoc.lat,
                long: this.state.cricketLoc.long,
                centered: true
            });
        }
    }
    
    fetchStationFromCoord = () =>{
        if(this.state.cricketLoc){
            var cricketLoc = this.state.cricketLoc;
            fetch(`https://api.weather.com/v3/location/near?geocode=${cricketLoc.lat},${cricketLoc.long}&product=pws&format=json&apiKey=7bbc7ab12048429fbc7ab12048229f5a`)
                .then(response => response.json())
                .then( (stationJSON) => {
                    console.log(`The nearest weather stations are ${stationJSON.location.stationId}`);
                    this.setState((prevState) => ({
                        cricketLoc: {
                            ...prevState.cricketLoc,
                            stationID: stationJSON.location.stationId[0]
                        }
                    }));
                })
                .catch((e) => console.log("Could not get station id from weather.com. \n"+e));
        }
    }
    
    fetchWeatherFromStation = () =>{
       if(this.state.cricketLoc.stationID){
            var stationID = this.state.cricketLoc.stationID;
            fetch(`https://api.weather.com/v2/pws/observations/current?stationId=${stationID}&format=json&units=e&apiKey=7bbc7ab12048429fbc7ab12048229f5a`)
                .then(response => response.json())
                .then( (weatherJSON) => {
                    this.setState((prevState) => ({
                        cricketLoc: {
                            ...prevState.cricketLoc,
                            outsideTempF: weatherJSON.observations[0].imperial.temp,
                            elevation: weatherJSON.observations[0].imperial.elev,
                        }
                    }));
                })
                .catch((e) => console.log("Could not get weather from station id from weather.com. \n"+e));
        }
    }
    
    fetchLocationfromCoord = () =>{
        if(this.state.cricketLoc){
            var cricketLoc = this.state.cricketLoc;
            fetch(`https://api.weather.com/v3/location/point?geocode=${cricketLoc.lat},${cricketLoc.long}&language=en-US&format=json&apiKey=7bbc7ab12048429fbc7ab12048229f5a`)
                .then(response => response.json())
                .then( (locJSON) => {
                    console.log(`You're in ${locJSON.location.city},${locJSON.location.adminDistrict}`);
                    this.setState((prevState) => ({
                        cricketLoc: {
                            ...prevState.cricketLoc,
                            city: locJSON.location.city,
                            state: locJSON.location.adminDistrict
                        }
                    }));
                })
                .then(this.fetchStationFromCoord)
                .then(this.fetchWeatherFromStation)
                .catch((e) => console.log("Could not get location from weather.com. \n"+e));
        }
    }
     
    //call the the tracker database to get the current location
    // get city location & weather ref https://docs.google.com/document/d/1xSpijI9MgWWfHaFX4wo_tB0GjtNeHZqGyp3XVOaAPl4/edit
    fetchCurrentLocation = () =>{
        fetch('http://tdh-scripts.herokuapp.com/gps-tracker/?request=latest')
        //fetch('http://tdh-scripts/gps-tracker/?request=latest')
            .then(response => response.json())
            .then( (newLoc) => {
                this.setState((prevState) => ({
                cricketLoc: {
                    ...prevState.cricketLoc,
                    lat: newLoc.lat,
                    long: newLoc.long
                }    
                }));
            })
            .then( () => console.log('location updated'))
            .then(this.centerOnCricket)
            .catch((e) => console.log("Could not get tracker location. \n"+e));
    }

    componentDidMount() {
        let refreshLocSec = 15; //specifies the seconds between calls to fetch the current cricket location.
        console.log('Refreshing cricket location every '+refreshLocSec+' seconds');
        this.fetchCurrentLocation();
        this.timer = setInterval(()=>this.fetchCurrentLocation(), refreshLocSec*1000);
        
        let refreshWeatherSec = 60; //specifies the seconds between calls to fetch the city/weather @ cricket location.
        console.log('Refreshing city/weather every '+refreshWeatherSec+' seconds');
        this.fetchLocationfromCoord();
        this.timer_weather = setInterval(()=>this.fetchLocationfromCoord(), refreshWeatherSec*1000);
        
        //check the screen size.
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }
    
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
        clearInterval(this.timer);
        clearInterval(this.timer_weather);
        
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