import React, { useCallback, useEffect, useState } from 'react';
import bg1 from "./images/1298139.jpg";
import RightBar from './components/RightBar';
import LeftBar from './components/LeftBar';
import loading from "./images/Loading.jpg"
import { showError } from './components/Functions';
import NavBar from './components/NavBar';
import Window from './components/Windows/Window';

function App() {
  const bg = `url(${bg1})`;
  const loadingbg = loading;
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
  const [Counter, setCounter] = useState(null);
  const [Count, setCount] = useState(null);
  const [window, setWindow] = useState("Home")
  const [weatherReports, setWeatherReports] = useState("")
  
  const count = (countValue) => {
    setCount(countValue);
  }
  
  useEffect(() => {
    setTimer(true);
    setCounter(Count); 
  }, [Count]);
  
  
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
        console.log("Here");
        weatherdetails(lat, lon);
        return fetch(null);
      })
      
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const weatherdetails = useCallback((lat, lon) => {
    WeatherReport(lat,lon)
    const YOUR_API_KEY = "45af0dcd4891e988e07e6aef3e525b8e";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${YOUR_API_KEY}&lat=${lat}&lon=${lon}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
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
  }, []);
const WeatherReport = (lat, lon) => {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,pressure_msl,surface_pressure,cloud_cover,visibility,wind_speed_10m,wind_direction_10m,uv_index,uv_index_clear_sky,is_day&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant&past_days=14&past_hours=24&past_minutely_15=24&forecast_days=16&forecast_hours=24&forecast_minutely_15=96`;

    return fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setWeatherReports(data) 
            return data;
            
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            throw error; 
        });
};
  useEffect(() => {
    if (place) {
      inputPosition(place);
    }
  }, );

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
  }, [weatherdetails]);

  // console.log(data);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimer(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [Counter]);
  // console.log(Counter);

  const handleForecast = (title) => {
    setWindow(title)
};
console.log(window);


return (
  <>
  <div className='flex items-center justify-center' style={{ background: bg, height: "100vh", width: "100vw" }}>
    {!Timer && (
      <div className="box w-40 h-3/4 border-gray-600 border-2 bg-slate-500 rounded-2xl">
        <NavBar handleForecast={handleForecast}/>
      </div>
    )}

                                              {window === "Home" && (
                                                <div className="box w-5/12 h-3/4 border-gray-600 border-2 rounded-xl">
                                                  {Timer ? (
                                                    <div className="flex h-full w-full">
                                                      <div className="w-full h-full" style={{ background: loadingbg }}>
                                                        <img src={loadingbg} alt="Image1" style={{ width: "100%", height: "100%" }} className='rounded-xl' />
                                                      </div>
                                                  </div>
                                                ) : (
                                                  <LeftBar data={data} />
                                                )}
                                              </div> 
                                              )}
                                              {window === "Home" && !Timer && (
                                                <div className="box w-1/4 h-3/4 border-gray-600 border-2 bg-gray-800 rounded-xl bg-opacity-75">
                                                  <RightBar data={data} search={input} count={count} />
                                                  </div>
                                              )}
    {window!=="Home"&&(
      <div className="flex justify-center items-center w-8/12 h-3/4 border-slate-700 rounded-xl border-2">
        <Window window={window} WeatherReports={weatherReports} data={data}/>
      </div>
    )}
  </div>
</>

);
      }
export default App;
