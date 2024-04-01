import Rain from "../images/img1.jpg";
import Clear from "../images/Clear Sky.jpg";
import Clouds from "../images/Few Clouds.jpg";
import Drizzle from "../images/Drizzle.jpg";
import Thunderstorm from "../images/Thunderstorm.jpg";
import Snow from "../images/Snow.jpg";
import Mist from "../images/Mist.jpg";
import Smoke from "../images/Smoke.jpg";
import Haze from "../images/Haze.jpg";
import Dust from "../images/Dust.jpg";
import Fog from "../images/Fog.jpg";
import Sand from "../images/Sand.jpg";
import Ash from "../images/Ash.jpg";
import Squall from "../images/squall.jpg";
import Tornado from "../images/Tornado.jpg";
export default function getBackgroundImage(weather) {
    switch (weather) {
        case 'Rain':
            return Rain;
        case 'Clear':
            return Clear;
        case 'Clouds':
            return Clouds;
        case 'Drizzle':
            return Drizzle;
        case 'Thunderstorm':
            return Thunderstorm;
        case 'Snow':
            return Snow;
        case 'Mist':
            return Mist;
        case 'Smoke':
            return Smoke;
        case 'Haze':
            return Haze;
        case 'Dust':
            return Dust;
        case 'Fog':
            return Fog;
        case 'Sand':
            return Sand;
        case 'Ash':
            return Ash;
        case 'Squall':
            return Squall;
        case 'Tornado':
            return Tornado;
        default:
            return Clear; 
    }
}  
export function showError(error) {
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