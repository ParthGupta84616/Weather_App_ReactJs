import React, { useState } from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
// import { act } from '@testing-library/react';



function Window({ window, WeatherReports, data }) {
  const [activeButton, setActiveButton] = useState('daily');
  // const [Try, setTry] = useState("")


  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };
  const TotalReport = { ...WeatherReports, ...data };
  let daily = [];
  let datesWithoutPrefix = [];
  let temperatureMax = [];
  let temperatureMin = [];
  let Heading =""
  let SubHeading_1=""
  let Value_1 = ""
  let SubHeading_2=""
  let Value_2 = ""
  let SubHeading_3=""
  let Value_3 = ""
  let SubHeading_4=""
  let Value_4 = ""
  let SubHeading_5=""
  let Value_5 = ""
  let MinValueHumi=""
  let MaxValueHumi = ""
  
  if (window === "Temperature"){
    if (activeButton === "daily") {
      daily = [TotalReport.daily.time, TotalReport.daily.temperature_2m_max, TotalReport.daily.temperature_2m_min];
      datesWithoutPrefix = daily[0].map(date => date.substring(5));
      temperatureMax = daily[1];
      temperatureMin = daily[2];
    }
    else {
      daily = [TotalReport.hourly.time, TotalReport.hourly.temperature_2m, TotalReport.hourly.relative_humidity_2m];
      datesWithoutPrefix = daily[0].map(date => date.substring(5));
      temperatureMax = daily[1];
      temperatureMin = daily[2];
      let dailyModified = TotalReport.hourly.time.map((dateTime) => {
        let date = dateTime.substring(5, 10);
        let time = dateTime.substring(11);
        let newTime = new Date(`2000-01-01T${time}`);
        newTime.setHours(newTime.getHours() + 6);
        let newTimeString = newTime.toTimeString().substring(0, 5);
        return `${date}T${newTimeString}`;
      
      });
      var newHour = dailyModified;
    }
  }
    console.log(Chart);
    console.log(TotalReport);
    
    const temperatureDifferences = temperatureMax.map((maxTemp, index) => {
        const minTemp = temperatureMin[index];
        const difference = (maxTemp + minTemp)/2;
        return difference.toFixed(1);
    });
    const temperatureVariation = temperatureMax.map((maxTemp, index) => {
      const minTemp = temperatureMin[index];
      const variation = maxTemp-minTemp;
      return variation.toFixed(1);
  });
    
    let MaxValue = Math.max(...temperatureMax)
    let MinValue = Math.min(...temperatureMin)
    const sum = temperatureVariation.reduce((acc, curr) => acc + parseFloat(curr), 0);
    const averageVariation = (sum / temperatureVariation.length).toFixed(1);
    const diff = temperatureDifferences.reduce((acc, curr) => acc + parseFloat(curr), 0);
    const difference = (diff / temperatureDifferences.length).toFixed(1)
    
    let chartData = {};
    let chartOptions = {};
    let chartData1 = {};
    
    chartOptions = {
      plugins: {
        tooltip: {
          callbacks: {} 
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
              labels: "",
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
  
    chartData = {
      // labels: datesWithoutPrefix,
      datasets: [
        {
            label: '',
            data: "",
            fill: false,
            backgroundColor: 'rgba(0, 0, 0, 0)', 
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 2,
        },
        
      ]
    };
  
    chartData1 = {
      labels: datesWithoutPrefix,
      datasets: [
        {
            label: '',
            data: "",
            fill: '-1', 
            backgroundColor: 'rgba(0, 0 , 0 , 0)', 
            borderColor: 'rgba(0, 0, 0, 1)',
            borderWidth: 2,
        },
        
      ]
    };
    if (activeButton === "daily") {
      chartData.labels = datesWithoutPrefix
      chartOptions.plugins.tooltip.callbacks.label = function(context) {
        let label = context.dataset.label || '';
        if (label) {
          label += ': ';
        }
        if (context.parsed.y !== null) {
          label += context.parsed.y + '°C';
        }
        return label;
      };
      chartData.datasets.push(
        {
          label: 'Difference',
          data: temperatureDifferences, 
          fill: false,
          backgroundColor: 'rgba(255, 0, 0, 1)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
        }
      )
      chartData1.datasets.push(
        {
          label: 'Difference',
          data: temperatureDifferences, 
          fill: false,
          backgroundColor: 'rgba(255, 0, 0, 1)',
          borderColor: 'rgba(255, 0, 0, 1)',
          borderWidth: 1,
        }
      )
      chartData.datasets[0].label = "Maximun Temperature"
      chartData1.datasets[0].label = "Minimum Temperature"
      chartData.datasets[0].data = temperatureMax
      chartData1.datasets[0].data = temperatureMin
      Heading = "30 Days Summary"
      SubHeading_1="Max Temp"
      Value_1=`${MaxValue} <span>&deg;C</span>`
      SubHeading_2="Min Temp"
      Value_2=`${MinValue} <span>&deg;C</span>`
      SubHeading_3="Avg Median"
      Value_3=`${difference} <span>&deg;C</span>`
      SubHeading_4="Avg Variation"
      Value_4=`${averageVariation} <span>&deg;C</span>`
    }
    else {
      
      
      chartData.labels = newHour
      chartData1.labels = newHour
      chartOptions.plugins.tooltip.callbacks.label = function(context) {
        let label = context.dataset.label || '';
        if (label) {
          label += ': ';
        }
        if (context.parsed.y !== null) {
          if (label.includes("Humidity")) {
            label += context.parsed.y + '%';
          } else {
            label += context.parsed.y + '°C';
          }
        }
        return label;
      };
      chartData.datasets[0].label = "Maximum Temperature"
      chartData1.datasets[0].label = "Maximum Humidity "
      chartData.datasets[0].data = temperatureMax
      chartData1.datasets[0].data = temperatureMin
      MaxValue = Math.max(...temperatureMax)
      MinValue = Math.min(...temperatureMax)
      MaxValueHumi = Math.max(...temperatureMin)
      MinValueHumi = Math.min(...temperatureMin)
      
      Heading = "48 Hours Summary"
      SubHeading_1="Max Temp"
      Value_1=`${MaxValue} <span>&deg;C</span>`
      SubHeading_3="Max Humidity"
      Value_3=`${MaxValueHumi} %`
      SubHeading_2="Min Temp"
      Value_2=`${MinValue} <span>&deg;C</span>`
      SubHeading_4="Min Temp"
      Value_4=`${MinValueHumi} %`
    }
    return (
      <>
  <div className="upper w-full h-full text-4xl font-mono">
  <div className='flex h-full'>
    <div className="w-1/5 h-full ">
      <div className="text-3xl p-10 h-1/4">
        {Heading}
      </div>
      <div className="h-1/4">
        <div className="ml-10 text-3xl ">
          {SubHeading_1}
        </div>
        <div className="ml-8 text-3xl p-2 ">
        <div dangerouslySetInnerHTML={{ __html: Value_1 }}></div>
        </div>
      </div>
      <div className="h-1/4">
        <div className="ml-10 text-3xl ">
          {SubHeading_2}
        </div>
        <div className="ml-8 text-3xl p-2 ">
        <div dangerouslySetInnerHTML={{ __html: Value_2 }}></div>
        </div>
      </div>
      <div className="h-1/4">
        <div className="ml-10 text-3xl ">
          {SubHeading_3}
        </div>
        <div className="ml-8 text-3xl p-2 ">
        <div dangerouslySetInnerHTML={{ __html: Value_3 }}></div>
        </div>
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
      <div className="h-full">
      <div className="flex justify-center -mt-4 ">
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
      <div className="h-1/4">
        <div className="ml-10 text-3xl ">
          {SubHeading_4}
        </div>
        <div className="ml-8 text-3xl p-2 ">
        <div dangerouslySetInnerHTML={{ __html: Value_4 }}></div>
        </div>
      </div>
      
    </div>
    
  </div>
</div>

</>

    );
}

export default Window;
 