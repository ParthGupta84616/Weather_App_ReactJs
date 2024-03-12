import React from 'react';

function RightBottom({ label, value }) {
  return (
    <div className="mt-2 ml-12 text-white w-3/4 justify-center border-gray-600 border-b-2 flex">
      <div className="second w-3/4  flex justify-start">
        <div className="left justify-end"><h1 className='text-lg font-medium'>{label}</h1></div>
      </div>
      <div className="second w-3/4   flex justify-end">
        <div className="left justify-end"><h1 className='text-lg font-medium'>{value}</h1></div>
      </div>
    </div>
  );
}

export default RightBottom;
