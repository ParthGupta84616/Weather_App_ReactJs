import React from 'react';
import Chart from 'chart.js/auto'; 
import { Line } from 'react-chartjs-2';


function Window({ window, WeatherReports, data }) {
    const TotalReport = { ...WeatherReports, ...data };
    console.log(TotalReport);

    const chartOptions = {
          interaction: {
            mode: 'index', // Enables interaction mode for tooltip display
            intersect: false, // Tooltip only displays when the user hovers directly over a data point
        },
        animation: {
            duration: 1000, // Animation duration in milliseconds
            easing: 'easeInOutQuart', // Easing function for animation
        },
        scales: {
            x: {
                type: 'category',
                labels: TotalReport.daily.time,
                barThickness: 150,
            },
            y: {
                // Define y-axis options if needed
            }
        }
        
    };

    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Temperature',
                data: TotalReport.daily.temperature_2m_max,
                fill: false,
                backgroundColor: 'rgba(0, 0, 0, )',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 1,
            },
        ]
    };

    return (
      <>
      <div className="upper w-full h-1/2">
          <div style={{ width: '100%', height: '100%' }}> 
              <Line data={chartData} options={chartOptions} />
          </div>
      </div>
  </>
  
  
  
    );
}

export default Window;
