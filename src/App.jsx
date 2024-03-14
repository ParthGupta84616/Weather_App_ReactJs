import React, { useEffect, useState } from 'react';
import bg1 from "./images/1298139.jpg";
import RightBar from './components/RightBar';
import LeftBar from './components/LeftBar';
import loading from "./images/Loading.jpg"

function App() {
  const bg = `url(${bg1})`;
  const [loadingbg, setloadingbg] = useState(loading)
  const [userData, setUserData] = useState(null);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [sunrise, setSunrise] = useState(null);
  const [weather, setWeather] = useState(null);
  const [maxtemp, setMaxtemp] = useState(null);
  const [mintemp, setMintemp] = useState(null);
  const [curtemp, setCurtemp] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [visibility, setVisibility] = useState(null);
  const [cloud, setCloud] = useState(null);
  const [place, setPlace] = useState(null);
  const [timezone, setTimezone] = useState(null)
  const [Timer, setTimer] = useState(true)
  const [Counter, setCounter] = useState(null)
  
  var count=(count)=>{
    setCounter(count)
    setTimer(true)
  }
  const data = {
    city,
    country,
    sunrise,
    sunset,
    maxtemp,
    mintemp,
    curtemp,
    humidity,
    cloud,
    weather,
    wind,
    visibility,
    timezone
    
  };

  const input = (data) => {
    setPlace(data);
  };

  const inputPosition = (location) => {
    const APIkey = "45af0dcd4891e988e07e6aef3e525b8e";
    const geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${APIkey}`;

    fetch(geoApiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const lon = data[0].lon;
        const lat = data[0].lat;

        weatherdetails(lat, lon);

        return fetch(null);
      })
      .then(response => response.json())
      .then(weatherData => {
        console.log(weatherData);
        
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const weatherdetails = (lat, lon) => {
    const YOUR_API_KEY = "45af0dcd4891e988e07e6aef3e525b8e";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${YOUR_API_KEY}&lat=${lat}&lon=${lon}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);

        const sunriseUnixTimestamp = data.sys.sunrise + data.timezone;
        const sunsetUnixTimestamp = data.sys.sunset + data.timezone;
        const sunriseMilliseconds = sunriseUnixTimestamp * 1000;
        const sunsetMilliseconds = sunsetUnixTimestamp * 1000;
        const sunriseDate = new Date(sunriseMilliseconds);
        const sunsetDate = new Date(sunsetMilliseconds);
        const options = {
          timeZone: "UTC",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        };
        const sunriseIST = sunriseDate.toLocaleString("en-IN", options);
        const sunsetIST = sunsetDate.toLocaleString("en-IN", options);
        setSunrise(sunriseIST);
        setUserData(data);
        setSunset(sunsetIST);

        setCountry(data.sys.country);
        setCity(data.name);
        setWeather(data.weather[0].main);
        setMaxtemp(Math.floor(data.main.temp_max - 273));
        setMintemp(Math.floor(data.main.temp_min - 273));
        setCurtemp(Math.floor(data.main.temp - 273));
        setHumidity(data.main.humidity);
        setVisibility(data.visibility);
        setCloud(data.clouds.all);
        setWind(data.wind.speed);
        setTimezone(data.timezone)
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  };

  useEffect(() => {
    if (place) {
      inputPosition(place);
    }
  }, [place]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }

    function showPosition(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      weatherdetails(latitude, longitude);
    }

    function showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          console.log("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
         
          console.log("An unknown error occurred.");
          break;
        default:
          console.log("An error occurred:", error.message);
          break;
      }
    }
    
  }, []);
  console.log(data);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimer(false);
      setloadingbg(loading)
    }, 2000);

    return () => clearTimeout(timer);
  }, [Counter]);
  console.log(loadingbg);
  return (
    <>

      <div className='flex items-center justify-center' style={{ background : bg , height:"100vh" , width:"100vw" }}>
      <div className="box w-5/12 h-3/4 border-gray-600 border-2 rounded-xl">
        {Timer?(
        <div className="flex h-full w-full">
        <div className="w-full h-full" style={{ background: loadingbg}}>
          <img src={loadingbg} alt="Image1" style={{ width: "100%", height: "100%" }} className='rounded-xl' />
        </div>
      </div>
      
        
          
        ):(
          <LeftBar data={data}/>
          )
        }
        
      </div>
      
        {!Timer? (
          ( 
            <div className="box w-1/4 h-3/4 border-gray-600 border-2 bg-gray-800 rounded-xl bg-opacity-75">
            <RightBar data={data} search={input} count = {count} />
            </div>
          )
        ):(null)
        
        }
      
    </div>
    

    </>
  );
}

export default App;
