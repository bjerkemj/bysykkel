import axios from 'axios';

const BASE_URL = 'https://gbfs.urbansharing.com/trondheimbysykkel.no/';

export async function getStationInformation() {

    try {
        const response = await axios.get(`${BASE_URL}station_information.json`, {
            headers: {
                "Client-Identifier":"stud-stud"
            }
          });
    
        const stations = response.data.data.stations;
    
        return stations;
      } catch (errors) {
        console.error(errors);
      }
    
      return;
   
}

export async function getStationStatus() {

    try {
        const response = await axios.get(`${BASE_URL}station_status.json`, {
            headers: {
                "Client-Identifier":"stud-stud"
            }
          });
    
        const status = response.data.data.stations;
    
        return status;
      } catch (errors) {
        console.error(errors);
      }
    
      return;  
}