import React, { useState, useEffect } from 'react'
import { GoogleMap, Marker, MarkerClusterer, useJsApiLoader } from '@react-google-maps/api';
import { getStationInformation, getStationStatus } from "./dataHandler";

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  lat: 63.4305,
  lng: 10.3951
};


function App() {
  
  const [stationsInformation, setStationsInformation] = useState([]);

  useEffect(() => {
    getStations();
  }, [])

  const getStations = async() => {
    const [stations, statuses] = await Promise.all([getStationInformation(), getStationStatus()]);
    

    for (const i in stations){
      for (const j in statuses){
        if(stations[i].station_id === statuses[j].station_id){
          stations[j].num_bikes_available = statuses[i].num_bikes_available;
        }
      }
    }

    setStationsInformation(stations);

  }
  


  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  })

   /* const [map, setMap] = React.useState(null)
   const onLoad = React.useCallback(function callback(map) {
     setTimeout(500);
     const bounds = new window.google.maps.LatLngBounds();
     map.fitBounds(bounds);
     setMap(map)
   }, [])

   const onUnmount = React.useCallback(function callback(map) {
     setMap(null)
   }, []) */

  return isLoaded ? (
    <div>      
      <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          //onLoad={onLoad}
          //onUnmount={onUnmount}
        >
          
          { Object.keys(stationsInformation).map((key) => (
            <Marker
            key={stationsInformation[key].station_id}
            position={{
              lat: stationsInformation[key].lat,
              lng: stationsInformation[key].lon
            }}
            label={stationsInformation[key].num_bikes_available.toString()}
            />
            
          ))}
        </GoogleMap>
    
      </div>

  ) : <></>
}

export default App;