import React from 'react';

function NavBar() {
    const navItems = [
        { title: 'Home' },
        { title: 'Temperature' },
        { title: 'Precipitation' },
        { title: 'Wind' },
        { title: 'UV' },
        { title: 'Pressure' },
    ];

    const handleClick = (title) => {
        console.log(`Clicked: ${title}`);
    };

    return (
        <div className='w-full h-full text-xl text-slate-200 from-neutral-800 to-pink-900 fo font-mono'>
            {navItems.map((item, index) => (
                <button
                    key={index}
                    className="w-full h-1/6 flex justify-center items-center border-gray-400 border-2 rounded-lg bg-slate-800 p-2"
                    onClick={() => handleClick(item.title)}
                >
                    {item.title}
                </button>
            ))}
        </div>
    );
}

export default NavBar;
