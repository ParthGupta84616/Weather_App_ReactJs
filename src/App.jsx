import React, { useEffect, useState } from 'react';
import bg1 from "./images/1298139.jpg";
import RightBar from './components/RightBar';
import LeftBar from './components/LeftBar';

function App() {
  const bg = `url(${bg1})`;
  const [userData, setUserData] = useState(null);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null)
  const [sunset, setSunset] = useState(null)
  const [sunrise, setSunrise] = useState(null)
  const [weather, setWeather] = useState(null)
  const [maxtemp, setMaxtemp] = useState(null)
  const [mintemp, setMintemp] = useState(null)
  const [curtemp, setCurtemp] = useState(null)
  const [humidity, setHumidity] = useState(null)
  const [wind, setWind] = useState(null)
  const [visibility, setvisibility] = useState(null)
  const [cloud, setCloud] = useState(null)
  



  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  
    function showPosition(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const YOUR_API_KEY = "45af0dcd4891e988e07e6aef3e525b8e";
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${YOUR_API_KEY}&lat=${latitude}&lon=${longitude}`;
  
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          
          if (data && data.sys && data.sys.country) {
            
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
            setSunrise(sunriseIST)
            setUserData(data);
            setSunset(sunsetIST)
            setCountry(data.sys.country);
            setCity(data.name)
            setWeather(data.weather[0].main)
            setMaxtemp(Math.floor(data.main.temp_max - 273))
            setMintemp(Math.floor(data.main.temp_min - 273))
            setCurtemp(Math.floor(data.main.temp - 273))
            setHumidity(data.main.humidity)
            setvisibility(data.visibility)
            setCloud(data.clouds.all)
            setWind(data.wind.speed)
          }
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
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
  console.log(userData,country,city,sunrise,sunset,weather,maxtemp,mintemp,curtemp,humidity,wind,visibility,cloud);
  return (
    <div className='flex items-center justify-center' style={{ background : bg , height:"100vh" , width:"100vw" , }}>
      <div className="box w-5/12 h-3/4 border-gray-600 border-2 rounded-xl">
        <LeftBar userData={userData} />
      </div>
      <div className="box w-1/4 h-3/4 border-gray-600 border-2 bg-gray-800 rounded-xl bg-opacity-75">
        <RightBar userData={userData} />
      </div>
    </div>
  );
}

export default App;
