import React, { useState, useEffect } from 'react';

function NavBar({ handleForecast }) {
    const [Window, setWindow] = useState("Home");

    const navItems = [
        { title: 'Home' },
        { title: 'Temperature' },
        { title: 'Precipitation' },
        { title: 'Wind' },
        { title: 'UV' },
        { title: 'Pressure' },
    ];

    const handleClick = (title) => {
        handleForecast(title);
        setWindow(title);
    };


    return (
        <div className='w-full h-full text-xl text-slate-200 font-mono '>
            {navItems.map((item, index) => (
                <button
                    key={index}
                    className={`w-full h-1/6 flex justify-center items-center border-slate-500 border-2 rounded-lg  ${item.title === Window ? "bg-gradient-to-r from-slate-800  to-slate-800 via-slate-700" : "bg-gradient-to-r from-slate-900  to-slate-900 via-slate-800"} p-2`}
                    onClick={() => handleClick(item.title)}
                >
                    {item.title}
                </button>
            ))}
        </div>
    );
}

export default NavBar;
