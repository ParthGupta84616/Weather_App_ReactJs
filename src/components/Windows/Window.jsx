import React from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';



function Window({ window, WeatherReports, data }) {
  console.log(Chart);
    const TotalReport = { ...WeatherReports, ...data };
    console.log(TotalReport);
    const datesWithoutPrefix = TotalReport.daily.time.map(date => date.substring(5));
    const temperatureMax = TotalReport.daily.temperature_2m_max;
    const temperatureMin = TotalReport.daily.temperature_2m_min;
    const temperatureDifferences = temperatureMax.map((maxTemp, index) => {
        const minTemp = temperatureMin[index];
        const difference = (maxTemp + minTemp)/2;
        return difference.toFixed(1);
    });
    
    console.log(temperatureDifferences);
    

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
      <div className="upper w-full h-full">
        <div className='flex justify-center ' > 
        <div className="h-1/2 w-3/5"> 
        <Line 
               data={chartData} options={chartOptions}
          />
        </div>
      </div>
      <div className='flex justify-center ' > 
        <div className="h-1/2 w-3/5"> 
        <Line 
               data={chartData1} options={chartOptions}
          />
        </div>
        </div>
          
      
    
      </div>


  </>
  
  
  
    );
}

export default Window;
