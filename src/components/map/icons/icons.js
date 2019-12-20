 import L from 'leaflet'; 
 
 export const iconCricket = new L.Icon({
    iconUrl: require('./toon_cricket.png'),
    shadowUrl: require('./toon_cricket_shadow.png'),
    iconSize: [95, 44],
    shadowSize: [95, 44],
    iconAnchor: [95, 44],
    shadowAnchor: [95, 44],
    popupAnchor: [-50, -35],
    tooltipAnchor: [16, 14]
});