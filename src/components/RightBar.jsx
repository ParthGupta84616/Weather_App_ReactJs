import React from 'react';
import sunny from "../images/sunny.png"; // Import the GIF file directly

function RightBar() {
    return (
        <div className="icon-container">
            <img src={sunny} alt="Sunny Icon" className="icon size-20 opacity-100" />
        </div>
    );
}

export default RightBar;
