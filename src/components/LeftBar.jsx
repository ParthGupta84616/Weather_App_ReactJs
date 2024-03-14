import React, { useEffect, useState } from 'react';
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

function LeftBar({ data }) {
    function getBackgroundImage(weather) {
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
    const [bg, setBg] = useState(`url("/static/media/Clear Sky.bba5f87aa1901ad9ac49.jpg")`);
    const [utcDate, setUTCDate] = useState('');
    const [utcTime, setUTCTime] = useState('');

    useEffect(() => {
    const interval = setInterval(() => {
        const timezoneOffsetSeconds = data.timezone;
        const timezoneOffsetMilliseconds = timezoneOffsetSeconds * 1000; 

        const currentDate = new Date();
        const newDate = new Date(currentDate.getTime() + timezoneOffsetMilliseconds);

        setUTCDate(newDate.toUTCString().slice(0, 16)); 
        setUTCTime(newDate.toUTCString().slice(17, 25)); 
    }, 1000);

    return () => clearInterval(interval);
    }, [data.timezone]);

    useEffect(() => {
        const backgroundImage = getBackgroundImage(data.weather);
        setBg(`url("${backgroundImage}")`);
    }, [data.weather]);
    console.log(bg);
    return (
        <div className='w-full h-full rounded-xl text-slate-200' style={{ background : bg }}>

            <div className="upperbox mt- h-2/6">
                <div className="city flex justify-end  text-3xl p-4 -mb-2 font-serif"><strong>{data.city}</strong></div>
                <div className="country flex justify-end  text-3xl mr-4 font-medium"><strong>{data.country}</strong></div>
            </div>
            <div className="upperbox mt- h-1/6">
                <div className="city flex justify-start  text-3xl p-4 -mb-2 font-serif"><strong>Max {data.maxtemp} &deg;C </strong></div>
            </div>
            <div className="upperbox h-1/6">
                <div className="city flex justify-end  text-3xl font-serif p-4"><strong> {data.sunrise}</strong></div>
                <div className="city flex justify-end  text-3xl font-serif mr-4"><strong> {data.sunset}</strong></div>
            </div>

            <div className="lower w-full flex border-white p-4  mt-8 ">
                <div className="left justify-start w-2/3">
                    <div className="time text-6xl p-2 font-serif">
                        <p>{utcTime}</p>
                    </div>
                    <div className="date  text-3xl ml-4 mt-2 font-medium">
                        <p>{utcDate} </p>
                    </div>
                </div>
                <div className="temp">
                    <div className="flex justify-end mt-2">
                        <div class="value text-8xl font-thin"><strong>{data.curtemp}</strong></div>
                        <div class="unit text-6xl mt-6 font-extralight"><strong>&deg;C</strong></div>
                    </div>
                </div>

            </div>

            
        </div>
    );
}

export default LeftBar;
