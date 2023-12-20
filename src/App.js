import './App.css';
import Axios from 'axios';
import {useRef, useState} from 'react';
import { WiHumidity  } from "react-icons/wi";
import { FiWind } from "react-icons/fi";
import { BsCloudHaze2Fill } from "react-icons/bs";

const KEY = '735d8c73a8dc57bc18f4b9bf0b4fb1c1';


function App() {

  const [city, setCity] = useState("");
  const [data, setData] = useState();

  const inputRef = useRef(null);

  const fetchData = async () =>{
    try{
      const response = await Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}`)
      setData(response.data);
      setCity("");
      inputRef.current.focus();
      console.log(response.data);
    }
    catch(err){
      alert("Please enter a city name")
    }

  }

  return (
    <div className="App">
      <div>
      <div className='head'>Weather App</div>
      </div>
     <div className="container">
      <input className="input" type="text" ref={inputRef}
      placeholder="Enter city name"
      value={city}
      onChange={e => setCity(e.target.value)}/>
      <button onClick={fetchData} className="btn">Fetch</button>
      {data && (
        <div className="content">
          <h1 className='cityName'>{data.name}, {data.sys.country} /
          <span style={{fontSize:"20px"}}><b>{data.weather[0].main} <BsCloudHaze2Fill /></b></span></h1>
          <div className="climateDetails">
          <h2 className='climate'>Temp - {Math.round(data.main.temp)}°C</h2>
            <label>Lat - {data.coord.lat} | </label>
            <label>Lon - {data.coord.lon}</label>
          </div>
          <div className='humspy'>
            <h4>Humidity {data.main.humidity} <WiHumidity style={{fontSize:"25px"}}/></h4>
            <h4>Wind Speed {data.wind.speed} <FiWind style={{fontSize:"25px"}}/></h4>
          </div>
          </div>
          
      )}
       </div>
     </div>
  );
}

export default App;
