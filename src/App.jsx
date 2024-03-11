import React, {  } from 'react';
import bg1 from "./images/1298139.jpg";
import RightBar from './components/RightBar';
import LeftBar from './components/LeftBar';

function App() {
  const bg = `url(${bg1})`;

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
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}
function inputPosition(place) {
  const location = place;
  const APIkey = "45af0dcd4891e988e07e6aef3e525b8e";
  const geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${APIkey}`;

  fetch(geoApiUrl)
      .then(response => response.json())
      .then(data => {
          console.log(data);
          // console.log(data[0].name);
          // console.log(data[0].lon);
          // console.log(data[0].lat);
          // console.log(data[0].country);
          const lon = data[0].lon;
          const lat = data[0].lat;

          const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`;
          console.log(weatherApiUrl);

          return fetch(weatherApiUrl);
      })
      .then(response => response.json())
      .then(weatherData => {
          console.log(weatherData);
      })
      .catch(error => {
          console.error('Error fetching data:', error);
      });
}


function showError(error) {
    switch(error.code) {
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
    }
}



  return (
    <div className='flex items-center justify-center' style={{ background : bg , height:"100vh" , width:"100vw" , }}>
      <div className="box w-5/12 h-3/4 border-gray-600 border-2 rounded-xl">
      <LeftBar />
        
      </div>
      <div className="box w-1/4 h-3/4 border-gray-600 border-2 bg-gray-800 rounded-xl bg-opacity-75">
        <RightBar />
      </div>
      
    </div>
  );
}

export default App;
