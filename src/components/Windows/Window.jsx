import React from 'react'

function Window({window,WeatherReports,data}) {
    const TotalReport = {...WeatherReports,...data}
    console.log(TotalReport)
  return (
    <div>{window}</div>
  )
}

export default Window