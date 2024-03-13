import React, { useState } from 'react';
import sunny from "../images/sunny.png"; 
import seacrh from "../images/search.png"
import RightBottom from './RightBottom';

function RightBar({ data, search }) {
    const [searchCity, setSearchCity] = useState(null); 

    const handleChange = (event) => { 
        setSearchCity(event.target.value);
    }

    const handleClick = () => {
        search(searchCity); 
        setSearchCity("")
    }
    const handlekey = (event)=>{
        if(event.key==="Enter"){
            handleClick();

        }
    }

    return (
        <div className="icon-container">
            <div className="margin"> </div>
            <div className="icon flex h-1/3 justify-center items-center ">
                <img src={sunny} alt="Sunny Icon" className="icon size-28 opacity-100 m-4" />
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
