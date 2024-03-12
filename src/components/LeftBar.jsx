import React, { useState } from 'react';
import rain from "../images/img1.jpg";

function LeftBar({data}) {
    const Bg = `url(${rain})`;
    // console.log(userData.sys);
    // const [city, setCity] = useState("")

    return (
        <div className='w-full h-full rounded-xl text-slate-200' style={{ background: Bg }}>
            <div className="upperbox mt- h-2/6">
                <div className="city flex justify-end  text-3xl p-4 -mb-2 font-serif"><strong>{data.city}</strong></div>
                <div className="country flex justify-end  text-3xl mr-4 font-medium"><strong>{data.country}</strong></div>
            </div>
            <div className="upperbox mt- h-1/6">
                <div className="city flex justify-start  text-3xl p-4 -mb-2 font-serif"><strong>Max {data.maxtemp} &deg;C </strong></div>
                <div className="country flex justify-start  ml-4 text-3xl  font-serif"><strong>Min {data.mintemp} &deg;C </strong></div>
            </div>
            <div className="upperbox h-1/6">
                <div className="city flex justify-end  text-3xl font-serif p-4"><strong> {data.sunrise}</strong></div>
                <div className="city flex justify-end  text-3xl font-serif mr-4"><strong> {data.sunset}</strong></div>
            </div>

            <div className="lower w-full flex border-white p-4  mt-8 ">
                <div className="left justify-start w-2/3">
                    <div className="time text-6xl p-2 font-serif">
                        <p>18:16:32</p>
                    </div>
                    <div className="date  text-3xl ml-4 mt-2 font-medium">
                        <p>Sunday, 10 March 2024 </p>
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
