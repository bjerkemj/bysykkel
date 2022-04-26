import React, { useState, useEffect } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
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
  
  var place;

  const getStations = async() => {
    const data = [];
    await getStationInformation().then((stations)=>{
        for (const i in stations){
          data.push(stations[i])
        }
        
        setStationsInformation(data);

        getStationStatus().then((res)=>{
          for (const i in res){
            for (const j in data){
              if(res[i].station_id === data[j].station_id){
                data[j].num_bikes_available = res[i].num_bikes_available;
              }
            }
          }
        });
    });
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
          
          { stationsInformation.length && Object.keys(stationsInformation).map((key) => (
            place={
              lat: stationsInformation[key].lat,
              lng: stationsInformation[key].lon
            },
            stationsInformation[key].num_bikes_available && <Marker
            key={stationsInformation[key].station_id}
            position={place}
            label={stationsInformation[key].num_bikes_available.toString()}
            />
            
          ))}
          <Marker position={center} label={"20"} />
          <></>
        </GoogleMap>
    
        <button onClick={() => console.log(typeof stationsInformation[1].num_bikes_available)}>PP</button>
      </div>

  ) : <></>
}

export default App;