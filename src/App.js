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
    getData();
    console.log("ferdig")
  }, [])
  
  var place;

  const getData = async () => {
    try {
      const data = [];
      await getStationInformation().then((res)=>{
        for (const i in res){
          data.push(res[i])
        }
        setStationsInformation(data);
      });
      await getStationStatus().then((res)=>{
        for (const i in res){
          console.log(res[i])
          for (const j in stationsInformation){
            console.log(stationsInformation[j].station_id)
            if(res[i].station_id === stationsInformation[j].station_id){
              stationsInformation[j].num_bikes_available = res[i].num_bikes_available;
              console.log("halla")
            }

          }
          //data.push(res[i])
        }
      });

    } catch (e) {
      console.error(e);
    }
    
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  })

  // const [map, setMap] = React.useState(null)
  // const onLoad = React.useCallback(function callback(map) {
  //   setTimeout(500);
  //   const bounds = new window.google.maps.LatLngBounds();
  //   map.fitBounds(bounds);
  //   setMap(map)
  // }, [])

  // const onUnmount = React.useCallback(function callback(map) {
  //   setMap(null)
  // }, [])

  return isLoaded ? (
    <div>      
      <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          //onLoad={onLoad}
          //onUnmount={onUnmount}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          {Object.keys(stationsInformation).map((key) => (
            place={
              lat: stationsInformation[key].lat,
              lng: stationsInformation[key].lon
            },
            <Marker 
            position={place}
            label={stationsInformation[key].num_bikes_available}
            />
            
          ))}
          <Marker position={center} label={"20"} />
          <></>
        </GoogleMap>
        <button onClick={() => Promise.resolve(getStationStatus()).then(function(v){
          console.log(v)
        }) }>Get stations</button>
        <button onClick={() => console.log(stationsInformation)}>PP</button>
      </div>

  ) : <></>
}

export default App;