import React, { useState } from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';



function Window({ window, WeatherReports, data }) {
  const [activeButton, setActiveButton] = useState('daily');
  const [activeButton1, setActiveButton1] = useState('daily1');

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };
  const handleButtonClick1 = (buttonType) => {
    setActiveButton1(buttonType);
  };

  console.log(Chart);
    const TotalReport = { ...WeatherReports, ...data };
    console.log(TotalReport);
    const datesWithoutPrefix = TotalReport.daily.time.map(date => date.substring(5));
    const temperatureMax = TotalReport.daily.temperature_2m_max;
    const temperatureMin = TotalReport.daily.temperature_2m_min;
    const temperatureDifferences = temperatureMax.map((maxTemp, index) => {
        const minTemp = temperatureMin[index];
        const difference = (maxTemp + minTemp)/2;
        const variation = maxTemp-minTemp;
        return difference.toFixed(1);
    });
    const temperatureVariation = temperatureMax.map((maxTemp, index) => {
      const minTemp = temperatureMin[index];
      const variation = maxTemp-minTemp;
      return variation.toFixed(1);
  });
    
    const MaxValue = Math.max(...temperatureMax)
    const MinValue = Math.min(...temperatureMin)
    console.log(temperatureVariation);
    const sum = temperatureVariation.reduce((acc, curr) => acc + parseFloat(curr), 0);

    // Calculate average
    const averageVariation = (sum / temperatureVariation.length).toFixed(1);
    console.log(MinValue);
    

    const chartOptions = {
      plugins: {
          tooltip: {
              callbacks: {
                  label: function(context) {
                      let label = context.dataset.label || '';
                      if (label) {
                          label += ': ';
                      }
                      if (context.parsed.y !== null) {
                          label += context.parsed.y + '°C'; 
                      }
                      return label;
                  }
              }
          }
      },
      interaction: {
          mode: 'index',
          intersect: false,
      },
      animation: {
          duration: 1000,
          easing: 'easeInOutQuart',
      },
      scales: {
          x: {
              type: 'category',
              labels: datesWithoutPrefix,
              ticks: {
                  color: 'rgba(0, 0, 0, 1)',
                  font: {
                      weight: 'bold',
                      size: 9,
                  },
              },
          },
          y: {
              type: 'linear', 
              ticks: {
                  color: 'rgba(0, 0, 0, 1)',
                  font: {
                      weight: 'bold',
                      size: 9,
                  },
              },
          },
      }
  };
  
    const chartData = {
        labels: datesWithoutPrefix,
        datasets: [
          {
              label: 'Maximum Temperature',
              data: temperatureMax,
              fill: false,
              backgroundColor: 'rgba(0, 0, 0, 0)', 
              borderColor: 'rgba(0, 0, 0, 1)',
              borderWidth: 2,
          },
          {
            label: 'Difference',
            data: temperatureDifferences, 
            fill: false,
            backgroundColor: 'rgba(255, 0, 0, 1)',
            borderColor: 'rgba(255, 0, 0, 1)',
            borderWidth: 1,
        }
      ]
      
    } 
    const chartData1 = {
      labels: datesWithoutPrefix,
      datasets: [
        {
            label: 'Minimum Temperature',
            data: temperatureMin,
            fill: '-1', 
            backgroundColor: 'rgba(0, 0 , 0 , 0)', 
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 2,
        },
        {
          label: 'Difference',
          data: temperatureDifferences, 
          fill: false,
          backgroundColor: 'rgba(255, 0, 0, 1)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 2,
      }
    ]
    
    }           

    return (
      <>
  <div className="upper w-full h-full text-4xl font-mono">
  <div className='flex h-full'>
    <div className="w-1/5 h-full ">
      <div className="text-3xl p-10 ">
        30 Days Summary
      </div>
      <div className="ml-10 text-3xl ">
        Max Temp 
      </div>
      <div className="ml-8 text-3xl p-2 ">
        {MaxValue} <span>&deg;C</span>
      </div>
      <div className="ml-10 text-3xl mt-4">
        Mim Temp 
      </div>
      <div className="ml-8 text-3xl p-2 ">
        {MinValue} <span>&deg;C</span>
      </div>
      <div className="ml-10 text-3xl mt-4">
        Avg Variation In Temp 
      </div>
      <div className="ml-8 text-3xl p-2 ">
         {averageVariation}<span>&deg;C</span>
      </div>

    </div>
    <div className=" w-3/5  "> 
      <div className="h-1/2">
      <Line 
        data={chartData} 
        options={chartOptions}
      />
      </div>
      <div className="h-1/2">
      <Line 
        data={chartData1} 
        options={chartOptions}
      />
      </div>
    </div>
    <div className="w-1/5 h-2/3 mt-auto mb-auto flex flex-col justify-between ml-10">
      <div className="h-1/2">
      <div className="flex justify-center -mt-4">
        <button
          className={`border-black border-2 p-4 rounded-xl ${activeButton === 'daily' ? 'bg-slate-800' : 'bg-slate-600'}`}
          onClick={() => handleButtonClick('daily')}
        >
          Daily
        </button>
      </div>
      <div className="flex justify-center mt-8">
        <button
          className={`border-black border-2 p-4 rounded-xl ${activeButton === 'hourly' ? 'bg-slate-800' : 'bg-slate-600'}`}
          onClick={() => handleButtonClick('hourly')}
        >
          Hourly
        </button>
      </div>
      </div>

      <div className="h-1/2">
      <div className="flex justify-center mt-12">
        <button
          className={`border-black border-2 p-4 rounded-xl ${activeButton === 'daily' ? 'bg-slate-800' : 'bg-slate-600'}`}
          onClick={() => handleButtonClick('daily')}
        >
          Daily
        </button>
      </div>
      <div className="flex justify-center mt-8">
        <button
          className={`border-black border-2 p-4 rounded-xl ${activeButton === 'hourly' ? 'bg-slate-800' : 'bg-slate-600'}`}
          onClick={() => handleButtonClick('hourly')}
        >
          Hourly
        </button>
      </div>
      </div>
      
      
    </div>
    
  </div>
</div>

</>

    );
}

export default Window;
