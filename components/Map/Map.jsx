import React from 'react';
import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  Popup
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { statesData } from './data';
// import './App.css';
import L from "leaflet"

const center = [30.066,79.019];
const markerIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/gopalkrishz/Image/main/flat-twitter-icon-16.png',
  iconSize: [31, 46], // size of the icon
  iconAnchor: [15.5, 42], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -45] // point from which the popup should open relative to the iconAnchor
});


export const Map=()=> {
  return (
    <MapContainer
      center={center}
      zoom={4.6}
      style={{ width: '100vw', height: '100vh' }}
    >
      <TileLayer
        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=PYCbP611iOYz8MIYOsVp"
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      />
      {
        statesData.features.map((state) => {
          const coordinates = state.geometry.coordinates[0].map((item) => [item[1], item[0]]);
          return (<Polygon
            pathOptions={{
              fillColor: '#FD8D3C',
              fillOpacity: 0.7,
              weight: 2,
              opacity: 1,
              dashArray: 3,
              color: 'black'
            }}
            positions={coordinates}
            eventHandlers={{
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  dashArray: "",
                  fillColor: "#BD0026",
                  fillOpacity: 0.7,
                  weight: 2,
                  opacity: 1,
                  color: "white",
                })
              },
              mouseout: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.7,
                  weight: 2,
                  dashArray: "3",
                  color: 'black',
                  fillColor: '#FD8D3C'
                });
              },
              
              click: (e) => {
          
              }
            }}
          />)
        })
      }
      <Marker position={[11.0598,78.3874]} icon={markerIcon}><Popup><b>tamil Nadu</b></Popup></Marker>
      <Marker position={[10.8505,76.271]} icon={markerIcon}><Popup><b>Kerala</b></Popup></Marker>
      <Marker position={[15.371,75.713]} icon={markerIcon}><Popup><b>karnataka</b></Popup></Marker>
      <Marker position={[17.8743,78.1000]} icon={markerIcon}><Popup><b>Telangana</b></Popup></Marker>
      <Marker position={[15.912,79.740]} icon={markerIcon}><Popup><b>Andra Pradesh</b></Popup></Marker>
      <Marker position={[21.300,76.130]} icon={markerIcon}><Popup><b>Madhya pradesh</b></Popup></Marker>
      <Marker position={[19.250,73.160]} icon={markerIcon}><Popup><b>Maharashtra</b></Popup></Marker>
      <Marker position={[27.599,78.050]} icon={markerIcon}><Popup><b>UP</b></Popup></Marker>
      <Marker position={[22.258,71.192]} icon={markerIcon}><Popup><b>Gujarat</b></Popup></Marker>
      <Marker position={[28.704,77.102]} icon={markerIcon}><Popup><b>New Delhi</b></Popup></Marker>
      <Marker position={[30.066,79.019]} icon={markerIcon}><Popup><b>Uttarakhand</b></Popup></Marker>
      <Marker position={[31.104,77.173]} icon={markerIcon}><Popup><b>Himachal Pradesh</b></Popup></Marker>
      <Marker position={[26.200,92.937]} icon={markerIcon}><Popup><b>Assam</b></Popup></Marker>
      <Marker position={[33.277,75.341]} icon={markerIcon}><Popup><b>kashmir</b></Popup></Marker>
      <Marker position={[29.058,76.085]} icon={markerIcon}><Popup><b>haryana</b></Popup></Marker>
      <Marker position={[22.986,87.855]} icon={markerIcon}><Popup><b>West Bengal</b></Popup></Marker>
      <Marker position={[15.299,74.124]} icon={markerIcon}><Popup><b>goa</b></Popup></Marker>
      <Marker position={[23.610,85.279]} icon={markerIcon}><Popup><b>Jharkhand</b></Popup></Marker>
      <Marker position={[23.835,91.279]} icon={markerIcon}><Popup><b>Tirupura</b></Popup></Marker>
      <Marker position={[22.090,82.159]} icon={markerIcon}><Popup><b>Chhattisgarh</b></Popup></Marker>
      <Marker position={[27.023,74.217]} icon={markerIcon}><Popup><b>Rajasthan</b></Popup></Marker>
      <Marker position={[31.147,75.341]} icon={markerIcon}><Popup><b>Punjab</b></Popup></Marker>
      <Marker position={[25.096,85.313]} icon={markerIcon}><Popup><b>Bihar</b></Popup></Marker>
      <Marker position={[20.951,85.0985]} icon={markerIcon}><Popup><b>Odisha</b></Popup></Marker>
      <Marker position={[34.226,77.561]} icon={markerIcon}><Popup><b>this is roorkee</b></Popup></Marker>
      <Marker position={[25.476,91.366]} icon={markerIcon}><Popup><b>Meghalaya</b></Popup></Marker>
      <Marker position={[23.164,92.937]} icon={markerIcon}><Popup><b>Mizoram</b></Popup></Marker>
      <Marker position={[28.218,94.727]} icon={markerIcon}><Popup><b>Arunacha Pradesh</b></Popup></Marker>
      <Marker position={[24.663,93.063]} icon={markerIcon}><Popup><b>Manipur</b></Popup></Marker>
      <Marker position={[26.154,94.562]} icon={markerIcon}><Popup><b>nagaland</b></Popup></Marker>
      <Marker position={[27.533,88.512]} icon={markerIcon}><Popup><b>Sikkim</b></Popup></Marker>

    </MapContainer>
  );
}


// import { useEffect } from 'react';
// import L from 'leaflet';
// import * as ReactLeaflet from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import styles from './Map.module.css';
// import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
// import iconUrl from 'leaflet/dist/images/marker-icon.png';
// import shadowUrl from 'leaflet/dist/images/marker-shadow.png';



// export default function Map({ children, className, ...rest }){
//   const { MapContainer, MapConsumer } = ReactLeaflet;
//   let mapClassName = styles.map;

//   if ( className ) {
//     mapClassName = `${mapClassName} ${className}`;
//   }

//   useEffect(() => {
//     (async function init() {
//       delete L.Icon.Default.prototype._getIconUrl;

//       L.Icon.Default.mergeOptions({
//         iconRetinaUrl: iconRetinaUrl.src,
//         iconUrl: iconUrl.src,
//         shadowUrl: shadowUrl.src,
//       });
//     })();
//   }, []);

//   return (
//     <MapContainer className={mapClassName} {...rest}>
//       <MapConsumer>
//         {(map) => children(ReactLeaflet, map)}
//       </MapConsumer>
//     </MapContainer>
//   )
// }

