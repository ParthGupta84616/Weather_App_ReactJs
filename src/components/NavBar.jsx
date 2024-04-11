import React, { useState } from 'react';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

function NavBar({ handleForecast }) {
    const [window, setWindow] = useState("Home");

    const navItems = [
        { title: 'Home', route: '/' },
        { title: 'Temperature', route: '/temperature' },
        { title: 'Precipitation', route: '/precipitation' },
        { title: 'Wind', route: '/wind' },
        { title: 'UV', route: '/uv' }
    ];

    const handleClick = (title, route) => {
        handleForecast(title);
        setWindow(title);
        history.push(route); // Navigate to the specified route
    };

    return (
        <div className='w-full h-full text-xl text-slate-200 font-mono '>
            {navItems.map((item, index) => (
                <button
                    key={index}
                    className={`w-full h-1/5 flex justify-center items-center border-slate-500 border-2 rounded-lg  ${item.title === window ? "bg-gradient-to-r from-slate-800  to-slate-800 via-slate-700" : "bg-gradient-to-r from-slate-900  to-slate-900 via-slate-800"} p-2`}
                    onClick={() => handleClick(item.title, item.route)}
                >
                    {item.title}
                </button>
            ))}
        </div>
    );
}

export default NavBar;
