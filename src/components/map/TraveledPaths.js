import React from 'react';
import { Polyline } from 'react-leaflet';

import {decompress} from './mapQuestFunctions';

const TraveledPath = (props) =>{
    
    const trip = props.traveledPath.map( (tripLeg) => {
        const latLongArry = decompress(tripLeg.MQencodedPath, 5);
        //TODO make marker that shows the time the leg was started.  Time is on tripleg.startTime
        
        //Convert the MapQuest array to a polyline for Leaflet.
        let i;
        let polyLinePoints = [];
        for (i = 0; i < latLongArry.length; i=i+2) {
            polyLinePoints.push([latLongArry[i], latLongArry[i+1]]);
        }
        return <Polyline color="#9eb5a7" positions={polyLinePoints} key={tripLeg.id} />;
    }
    );
    return trip;
};


export default TraveledPath;


