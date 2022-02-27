import React, {useEffect, useState} from 'react'
import '../components/style.css'
import Weatherdetails from './Weatherdetails';

function Searchmain() {

    const [searchTerm, setSearchTerm] = useState("");
    
    const [tempInfo, setTempInfo] = useState ({});

    const getWeatherInfo = async () => {

      try{
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=5bcdffedac93f53eec64c6c54773007a`

      let res = await fetch(url);
      let data = await res.json();

      const {temp, humidity, pressure} = data.main;

      const {main: weatherType} = data.weather[0];

      const {name} = data;

      const {speed} = data.wind;

      const {country, sunset} = data.sys;

      const myNewWeatherInfo = {
        temp, humidity, pressure, weatherType, name, speed, country, sunset,
      };

      setTempInfo(myNewWeatherInfo);

      }
      catch(error){
        console.log(error);
      }

    }

    useEffect( () => {

        getWeatherInfo()
    },[])
  return (
    <>
    <div className="headtext"> Check Weather</div>
      <div className="wrap">
      

        <div className="search">
            <input type="search" placeholder="Search City" id="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>

        <button className="searchButton" onClick={getWeatherInfo} >
            Search
        </button>
        </div>
        
    </div>
    <Weatherdetails {...tempInfo} />
    </>
    
  )
}

export default Searchmain