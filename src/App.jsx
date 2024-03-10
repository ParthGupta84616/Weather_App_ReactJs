import React, {  } from 'react';
import bg1 from "./images/1298139.jpg";
import RightBar from './components/RightBar';
import LeftBar from './components/LeftBar';

function App() {
  const bg = `url(${bg1})`;


  return (
    <div className='flex items-center justify-center' style={{ background : bg , height:"100vh" , width:"100vw" , }}>
      <div className="box w-5/12 h-3/4 border-gray-600 border-2 rounded-xl">
      <LeftBar />
        
      </div>
      <div className="box w-1/4 h-3/4 border-gray-600 border-2 bg-gray-800 rounded-xl bg-opacity-75">
        <RightBar />
      </div>
      
    </div>
  );
}

export default App;
