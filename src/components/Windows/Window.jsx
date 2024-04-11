import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { calculateTemperatureDifferences, calculateTemperatureVariation, modifyTime } from '../Functions';

function Window({ window, WeatherReports, data }) {
  const [activeButton, setActiveButton] = useState('daily');


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
  let MinValueHumi=""
  let MaxValueHumi = ""
  let wind_driection = ""
  let rain_sum
  let showers_sum
  var newHour
  let precipitation_probability_max
  let precipitation_sum
  let snowfall_sum
  let precipitation_hours
  let wind_gusts
  let wind_speed
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
      newHour = TotalReport.hourly.time.map(modifyTime)
    }
  }
  else if(window === "Precipitation"){
    if (activeButton === "daily") {
      daily = [TotalReport.daily.time,
         TotalReport.daily.precipitation_probability_max,
          TotalReport.daily.precipitation_sum,
          TotalReport.daily.precipitation_hours,
          TotalReport.daily.rain_sum,
          TotalReport.daily.showers_sum,
          TotalReport.daily.snowfall_sum];
          datesWithoutPrefix = daily[0].map(date => date.substring(5));
          precipitation_probability_max = daily[1]
          precipitation_sum= daily[2]
          precipitation_hours= daily[3]
          rain_sum = daily[4]
          showers_sum=daily[5]
          snowfall_sum = daily[6]
    }
    else {
      daily = [TotalReport.hourly.time, TotalReport.hourly.precipitation, TotalReport.hourly.precipitation_probability];
      datesWithoutPrefix = daily[0].map(date => date.substring(5));
      temperatureMax = daily[1];
      temperatureMin = daily[2];
      newHour = TotalReport.hourly.time.map(modifyTime)
    }
  }
  else if(window === "Wind"){
    if (activeButton === "daily") {
      daily = [TotalReport.daily.time,
         TotalReport.daily.wind_direction_10m_dominant,
          TotalReport.daily.wind_gusts_10m_max,
          TotalReport.daily.wind_speed_10m_max];
          datesWithoutPrefix = daily[0].map(date => date.substring(5));
          wind_driection = daily[1]
          wind_gusts= daily[2]
          wind_speed= daily[3]
    }
    else {
      daily = [TotalReport.hourly.time, TotalReport.hourly.wind_direction_10m, TotalReport.hourly.wind_speed_10m];
      datesWithoutPrefix = daily[0].map(date => date.substring(5));
      temperatureMax = daily[1];
      temperatureMin = daily[2];
      newHour = TotalReport.hourly.time.map(modifyTime)
    }
  }
  else if(window === "UV"){
    if (activeButton === "daily") {
      daily = [TotalReport.daily.time,
        TotalReport.daily.uv_index_max,
         TotalReport.daily.sunshine_duration];
          datesWithoutPrefix = daily[0].map(date => date.substring(5));
          wind_driection = daily[1]
          wind_gusts= daily[2]
    }
    else {
      daily = [TotalReport.hourly.time, TotalReport.hourly.uv_index, TotalReport.hourly.uv_index_clear_sky];
      datesWithoutPrefix = daily[0].map(date => date.substring(5));
      temperatureMax = daily[1];
      temperatureMin = daily[2];
      newHour = TotalReport.hourly.time.map(modifyTime)
    }
  }

    
    
    let chartData = {};
    let chartOptions = {};
    let chartData1 = {};
    
    chartOptions = {
      plugins: {
        tooltip: {
          callbacks: {} 
        }
      },
      elements: {
        line: {
            tension: 0.5, 
        }
    },
      interaction: {
        mode: 'index',
        intersect: false,
      },
      animation: {
          duration: 10,
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
    if (window==="Temperature"){
      if (activeButton === "daily") {
        const temperatureDifferences = calculateTemperatureDifferences(temperatureMax, temperatureMin);
        const temperatureVariation = calculateTemperatureVariation(temperatureMax, temperatureMin);
        let MaxValue = Math.max(...temperatureMax)
        let MinValue = Math.min(...temperatureMin)
          chartData.labels = datesWithoutPrefix
          chartData1.labels = datesWithoutPrefix
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
          const sum = temperatureVariation.reduce((acc, curr) => acc + parseFloat(curr), 0);
          const averageVariation = (sum / temperatureVariation.length).toFixed(1);
          const diff = temperatureDifferences.reduce((acc, curr) => acc + parseFloat(curr), 0);
          const difference = (diff / temperatureDifferences.length).toFixed(1)
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
          let MaxValue = Math.max(...temperatureMax)
          let MinValue = Math.min(...temperatureMin)
          
          
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
          SubHeading_4="Min Humidity"
          Value_4=`${MinValueHumi} %`
        }
    }
    if(window ==="Precipitation"){
      if (activeButton === "daily"){
        let MaxValue = Math.max(...precipitation_probability_max)
        const maxIndex = precipitation_probability_max.indexOf(MaxValue)
        
        const PrehouSum = precipitation_hours.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const PreSum = precipitation_sum.reduce((accumulator, currentValue) => accumulator + currentValue, 0).toFixed(1);
        let highPre = Math.max(...precipitation_sum)
        const maxIndexPre = precipitation_sum.indexOf(highPre)
          chartData.labels = datesWithoutPrefix
          chartData1.labels = datesWithoutPrefix
          chartOptions.plugins.tooltip.callbacks.label = function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              if (label.includes("Probability")) {
                label += context.parsed.y + '%';
              }
              else if (label.includes("Hours")) {
                label += context.parsed.y + 'h';
              }
              else if (label.includes("Precipitation")) {
                label += context.parsed.y + 'mm';
              } else {
                label += context.parsed.y + '°C';
              }
            }
            return label;
          };
          chartData.datasets.push(
            {
              label: 'Precipitation Hours',
              data: precipitation_hours, 
              fill: false,
              backgroundColor: 'rgba(255, 0, 0, 1)',
              borderColor: 'rgba(255, 0, 0, 1)',
              borderWidth: 1,
            }
          )
          chartData1.datasets.push(
            {
              label: 'Rain Precipitation',
              data: rain_sum, 
              fill: false,
              backgroundColor: 'rgba(255, 0, 0, 1)',
              borderColor: 'rgba(255, 0, 0, 1)',
              borderWidth: 1,
            }
          ) 
          chartData1.datasets.push(
            {
              label: 'Snow Precipitation',
              data: snowfall_sum, 
              fill: false,
              backgroundColor: 'rgba(143, 109, 90, 0.42)',
              borderColor: 'rgba(143, 109, 90, 0.42)',
              borderWidth: 1,
            }
          ) 
          chartData1.datasets.push(
            {
              label: 'Shower Precipitation',
              data: showers_sum, 
              fill: false,
              backgroundColor: 'rgba(245, 40, 145, 0.8)',
              borderColor: 'rgba(245, 40, 145, 0.8)',
              borderWidth: 1,
            }
          ) 
          chartData.datasets[0].label = "Precipitation Probability"
          chartData.datasets[0].data = precipitation_probability_max
          chartData1.datasets[0].label = "Total Precipitation"
          chartData1.datasets[0].data = precipitation_sum
          Heading = "30 Days Summary"
          SubHeading_1="Precip. Prob."
          Value_1=`${MaxValue} % On ${datesWithoutPrefix[maxIndex]}`
          SubHeading_2="Precip. Hours"
          Value_2=`${PrehouSum} h`
          SubHeading_3="Precip. Sum(mm)"
          Value_3=`${PreSum} mm`
          SubHeading_4="Hightest Precip(mm)"
          Value_4=`${highPre} mm On ${datesWithoutPrefix[maxIndexPre]}`

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
            if (label.includes("Probability")) {
              label += context.parsed.y + '%';
            }
            else if (label.includes("Hours")) {
              label += context.parsed.y + 'h';
            }
            else if (label.includes("Precipitation")) {
              label += context.parsed.y + 'mm';
            } else {
              label += context.parsed.y + '°C';
            }
          }
          return label;
        };
        chartData.datasets[0].label = "Precipitation";
        chartData1.datasets[0].label = "Precipitation Probability "
        chartData.datasets[0].data = temperatureMax
        chartData1.datasets[0].data = temperatureMin
        const MaxValue = Math.max(...temperatureMax)
        const MinValue = Math.max(...temperatureMin)
        const PrehouSum = temperatureMax.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        
        Heading = "48 Hours Summary"
        SubHeading_1="Precipi."
        Value_1=`${MaxValue} mm`
        SubHeading_2="Precipi. Prob."
        Value_2=`${MinValue} %`
        SubHeading_3="Total Precipi"
        Value_3=`${PrehouSum} mm`
        SubHeading_4="Total Precipi. Prob."
        Value_4=`${temperatureMin.reduce((accumulator, currentValue) => accumulator + currentValue, 0)} %`
      }
  
    }
    if(window ==="Wind"){
      if (activeButton === "daily"){
        const sum = wind_driection.reduce((total, num) => total + num, 0);
        const average = (sum / wind_driection.length).toFixed(2);
        const sum_speed = wind_speed.reduce((total, num) => total + num, 0);
        const average_speed = (sum_speed / wind_driection.length).toFixed(2);
          chartData.labels = datesWithoutPrefix
          chartData1.labels = datesWithoutPrefix
          chartOptions.plugins.tooltip.callbacks.label = function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              if (label.includes("Probability")) {
                label += context.parsed.y + '%';
              }
              else if (label.includes("Hours")) {
                label += context.parsed.y + 'h';
              }
              else if (label.includes("Precipitation")) {
                label += context.parsed.y + 'mm';
              }
              else if (label.includes("Direction")) {
                label += context.parsed.y + '°';
              }  else if (label.includes("Wind")) {
                  label += context.parsed.y + 'km/h';
                } else {
                label += context.parsed.y + '°';
              }
            }
            return label;
          };
          chartData1.datasets.push(
            {
              label: 'Wind Gust',
              data: wind_gusts, 
              fill: false,
              backgroundColor: 'rgba(255, 0, 0, 1)',
              borderColor: 'rgba(255, 0, 0, 1)',
              borderWidth: 1,
            }
          ) 
      
          chartData.datasets[0].label = "Wind Direction"
          chartData.datasets[0].data = wind_driection
          chartData1.datasets[0].label = "Wind Speed"
          chartData1.datasets[0].data =wind_speed
          Heading = "30 Days Summary"
          SubHeading_1="Average Direction"
          Value_1=`${average}°`
          SubHeading_2="Highest Speed"
          Value_2=`${Math.max(...wind_speed).toFixed(1)} Km/h`
          SubHeading_3="Highest Gusts"
          Value_3=`${Math.max(...wind_gusts).toFixed(1)} Km/h`
          SubHeading_4="Average Speed"
          Value_4=`${average_speed}Km/h`

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
            if (label.includes("Probability")) {
              label += context.parsed.y + '%';
            }
            else if (label.includes("Hours")) {
              label += context.parsed.y + 'h';
            }
            else if (label.includes("Precipitation")) {
              label += context.parsed.y + 'mm';
            }
            else if (label.includes("Direction")) {
              label += context.parsed.y + '°';
            }  else if (label.includes("Wind")) {
                label += context.parsed.y + 'km/h';
              } else {
              label += context.parsed.y + '°';
            }
          }
          return label;
        };
        chartData.datasets[0].label = "Wind Direction";
        chartData1.datasets[0].label = "Wind Speed";
        chartData.datasets[0].data = temperatureMax
        chartData1.datasets[0].data = temperatureMin
        const MaxValue = Math.max(...temperatureMax)
        const MinValue = Math.max(...temperatureMin)
        
        let sum = temperatureMax.reduce((total, num) => total + num, 0);
        let average = (sum / temperatureMax.length).toFixed(1);
        
        Heading = "48 Hours Summary"
        SubHeading_1="Direction Max"
        Value_1=`${MaxValue} °`
        SubHeading_2="Avg Direction"
        Value_2=`${average} °`
        SubHeading_3="Max Speed"
        Value_3=`${MinValue} Km/h`
        let sum1 = temperatureMin.reduce((total, num) => total + num, 0);
        let average1 = (sum1 / temperatureMax.length).toFixed(1);
        SubHeading_4="Avg Speed"
        Value_4=`${average1} Km/h`
       }
    }
    if(window ==="UV"){
      if (activeButton === "daily"){
        let dividedArray = wind_gusts.map(element => (element / 3600).toFixed(1));
        const sum = wind_driection.reduce((total, num) => total + num, 0);
        const average = (sum / wind_driection.length).toFixed(2);
          chartData.labels = datesWithoutPrefix
          chartData1.labels = datesWithoutPrefix
          chartOptions.plugins.tooltip.callbacks.label = function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              if (label.includes("Probability")) {
                label += context.parsed.y + '%';
              }
              else if (label.includes("Hours")) {
                label += context.parsed.y + 'h';
              }
              else if (label.includes("Precipitation")) {
                label += context.parsed.y + 'mm';
              }
              else if (label.includes("Direction")) {
                label += context.parsed.y + '°';
              }  else if (label.includes("Wind")) {
                  label += context.parsed.y + 'km/h';
                } else {
                label += context.parsed.y + '';
              }
            }
            return label;
          };
          chartData.datasets[0].label = "UV Index";
          chartData.datasets[0].data = wind_driection
          chartData1.datasets[0].label = "Sun Hours"
          

          chartData1.datasets[0].data = dividedArray
          Heading = "30 Days Summary"
          SubHeading_1="Max UV"
          Value_1=`${Math.max(...wind_driection)}`
          SubHeading_2="Average UV"
          Value_2=`${average}`
          SubHeading_3="Highest Sun"
          Value_3=`${Math.max(...dividedArray).toFixed(1)} h`

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
            if (label.includes("Probability")) {
              label += context.parsed.y + '%';
            }
            else if (label.includes("Hours")) {
              label += context.parsed.y + 'h';
            }
            else if (label.includes("Precipitation")) {
              label += context.parsed.y + 'mm';
            }
            else if (label.includes("Direction")) {
              label += context.parsed.y + '°';
            }  else if (label.includes("Wind")) {
                label += context.parsed.y + 'km/h';
              } else {
              label += context.parsed.y + '';
            }
          }
          return label;
        };
        chartData.datasets[0].label = "UV Index";
        chartData1.datasets[0].label = "UV Index Clear Sky";
        chartData.datasets[0].data = temperatureMax
        chartData1.datasets[0].data = temperatureMin
        const MaxValue = Math.max(...temperatureMax)
        const MinValue = Math.max(...temperatureMin)
        
        let sum = temperatureMax.reduce((total, num) => total + num, 0);
        let average = (sum / temperatureMax.length).toFixed(1);
        
        Heading = "48 Hours Summary"
        SubHeading_1="UV Index"
        Value_1=`${MaxValue}`
        SubHeading_2="Avg UV Index"
        Value_2=`${average} `
        SubHeading_3="Clear Sky UV"
        Value_3=`${MinValue}`
        let sum1 = temperatureMin.reduce((total, num) => total + num, 0);
        let average1 = (sum1 / temperatureMax.length).toFixed(1);
        SubHeading_4="Avg CLear Sky UV"
        Value_4=`${average1}`
       }
  
    }

    return (
      <>
  <div className="upper w-full h-full text-4xl font-mono">
  <div className='flex h-full'>
    <div className="w-1/5 h-full ">
      <div className="text-3xl p-10 h-1/4">
        {Heading}
      </div>
      <div className="h-1/4 p-2">
        <div className="ml-8 text-3xl ">
          {SubHeading_1}
        </div>
        <div className="ml-8 text-2xl  ">
        <div dangerouslySetInnerHTML={{ __html: Value_1 }}></div>
        </div>
      </div>
      <div className="h-1/4 p-2">
        <div className="ml-8 text-3xl ">
          {SubHeading_2}
        </div>
        <div className="ml-8 text-2xl  ">
        <div dangerouslySetInnerHTML={{ __html: Value_2 }}></div>
        </div>
      </div>
      <div className="h-1/4 p-2">
        <div className="ml-10 text-3xl ">
          {SubHeading_3}
        </div>
        <div className="ml-8 text-2xl ">
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
        <div className="ml-8 text-xl p-2 ">
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
 