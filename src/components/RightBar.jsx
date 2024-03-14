import React, { useEffect, useState } from 'react';
import sunny from "../images/sunny.png"; 
import seacrh from "../images/search.png"
import RightBottom from './RightBottom';
import  Clouds from "../Icons/Clouds.png"
import  Drizzle from "../Icons/Drizzle.png"
import  Dust from "../Icons/Dust.png"
import  Fog from "../Icons/Fog.png"
import  Haze from "../Icons/Haze.png"
import  Rain from "../Icons/Rain.png"
import  Smoke from "../Icons/Smoke.png"
import  Snow from "../Icons/Snow.png"
import  Thunderstrome from "../Icons/Thunderstrome.png"


function RightBar({ data, search , count }) {
    const [searchCity, setSearchCity] = useState(null); 
    const [Weather, setWeather] = useState(sunny)
    const [Count, setCount] = useState(0)

    useEffect(() => {
        switch (data.weather) {
            case "Rain":
                setWeather(Rain);
                break;
            case "Clear":
                setWeather(sunny);
                break;
            case "Clouds":
                    setWeather(Clouds);
                    break;
            case "Drizzle":
                setWeather(Drizzle);
                break;
            case "Dust":
                setWeather(Dust);
                break;      
            case "Fog":
                setWeather(Fog);
                break;
            case "Haze":
                setWeather(Haze);
                break;
            case "Snow":
                setWeather(Snow);
                break;
            case "Smoke":
                setWeather(Smoke);
                break;
            case "Thunderstrome":
                setWeather(Thunderstrome);
                break;
            default:
                setWeather(sunny);
                break;
        }
    }, [data.weather]);
    

    const handleChange = (event) => { 
        setSearchCity(event.target.value);
    }

    const handleClick = () => {
        search(searchCity); 
        setSearchCity("")
        setCount(Count+1)
        count(Count)
    }
    const handlekey = (event)=>{
        if(event.key==="Enter"){
            handleClick();

        }
    }
    console.log(Weather);

    return (
        <div className="icon-container">
            <div className="margin"> </div>
            <div className="icon flex h-1/3 justify-center items-center ">
                <img src={Weather} alt="Sunny Icon" className="icon size-28 opacity-100 m-4" />
            </div>
            <div className="dis flex justify-center text-white text-3xl font-mono "> <strong>{data.weather} </strong> </div>
            <div className="p-8 -mt-4 rounded-full ">
                <div className="line border-white border-2 "></div>
            </div>
            <div className="main flex justify-center">
                <div className="flex justify-center border-gray-600 border-b-2 w-2/3">
                    <input
                        type="text"
                        className='bg-transparent rounded-full w-2/3 text-white placeholder-white font-mono text-center'
                        value={searchCity}
                        onChange={handleChange}
                        onKeyDown={handlekey}
                        placeholder="Search Cities" />
                        
                    <button>
                        <img src={seacrh}
                            className='size-8'
                            onClick={handleClick}
                            alt="" />
                    </button>
                </div>

            </div>
            <div className=" ">
                <div className="flex justify-center mt-4 text-white  ">
                    <div className="second w-3/4  border-gray-600 border-b-2 flex justify-center">
                        <h1 className='text-2xl font-serif'>{data.city}</h1>
                    </div>
                </div>
                <RightBottom label={"Temprature"} value={`${data.curtemp} C`} />
                <RightBottom label={"Humidity"} value={`${data.humidity} %`} />
                <RightBottom label={"Visibility"} value={`${data.visibility} mi`} />
                <RightBottom label={"Wind Speed"} value={`${data.wind} km/h`} />
                <RightBottom label={"Clouds"} value={`${data.cloud} %`} />

            </div>
        </div>

    );
}

export default RightBar;
