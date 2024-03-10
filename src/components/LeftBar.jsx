import React from 'react';
import rain from "../images/img1.jpg";

function LeftBar() {
    const Bg = `url(${rain})`;
    console.log(Bg);
    return (
        <div className='w-full h-full rounded-xl' style={{ background: Bg }}>
            <div className="upperbox mt- h-4/6">
                <div className="city flex justify-end text-white text-3xl p-4 -mb-2 font-serif"><strong>Gwalior</strong></div>
                <div className="country flex justify-end text-white text-3xl mr-4 font-medium"><strong>IN</strong></div>
            </div>
            <div className="lower w-full flex border-white p-4 text-white mt-8 ">
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
                        <div class="value text-8xl font-thin"><strong>24</strong></div>
                        <div class="unit text-6xl mt-6 font-extralight"><strong>&deg;C</strong></div>
                    </div>
                </div>

            </div>

            
        </div>
    );
}

export default LeftBar;
