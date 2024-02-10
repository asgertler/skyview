/// <reference types="vite-plugin-svgr/client" />


// import {
//   TiWeatherCloudy,
//   TiWeatherDownpour,
//   TiWeatherNight,
//   TiWeatherPartlySunny,
//   TiWeatherShower,
//   TiWeatherSnow,
//   TiWeatherStormy,
//   TiWeatherSunny,
//   TiWeatherWindy,
//   TiWeatherWindyCloudy
// } from 'react-icons/ti'

import { WiCloudy } from "react-icons/wi"
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io"
import Logo from './assets/skyview-logo.svg?react'
import './App.sass'

function App() {
  // default location is Nashville, TN
  let lat: number = 36.174465
  let lng: number = -86.767960
  const city: string = 'Nashville'
  console.log('city', city)

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        lat = pos.coords.latitude as number
        lng = pos.coords.longitude as number

        console.log(`Latitude: ${lat}, longitude: ${lng}`)
      },
      (err) => {
        console.error("Error getting user location:", err)
      }
    )
  } else {
    console.error("Geolocation is not supported by this browser.")
  }

  const appVersion: string = APP_VERSION
  const currentYear: number = new Date().getFullYear()

  // test data
  const kelvinTemp: number = 292.07
  const kelvinToF: string = ((kelvinTemp-273.15)*9/5 + 32).toString().split('.')[0]
  const kelvinFeelsLikeTemp: number = 291.66
  const kelvinFeelsLikeToF: string = ((kelvinFeelsLikeTemp-273.15)*9/5 + 32).toString().split('.')[0]
  const kelvinHigh: number = 293.21
  const kelvinHToF: string = ((kelvinHigh-273.15)*9/5 + 32).toString().split('.')[0]
  const kelvinLow:number = 290.05
  const kelvinLToF: string = ((kelvinLow-273.15)*9/5 + 32).toString().split('.')[0]

  return (
    <div id='weather-container'>
      <header id='weather-header'>
        <Logo id='main-logo' />
          <div id='version'>
            v{appVersion}
          </div>
      </header>

      <div id='weather-info'>
        <div id='current-weather'>
          <div id='cw-left'>
            <WiCloudy />
            <p>Cloudy</p>
          </div>

          <div id='cw-right'>
            <div className='cwr-info-stack'>
              <div className='cwr-info'>
                <div className='info-label'>Temp</div>
                <div className='info-value'>{kelvinToF}°F</div>
              </div>

              <div className='cwr-info'>
                <div className='info-label'>Feels Like</div>
                <div className='info-value'>{kelvinFeelsLikeToF}°F</div>
              </div>
            </div>

            <div className='cwr-info-stack'>
              <div className='cwr-info'>
                <div className='info-label'>
                  <IoMdArrowDropup />High
                </div>
                <div className='info-value'>{kelvinHToF}°F</div>
              </div>

              <div className='cwr-info'>
                <div className='info-label'>
                  <IoMdArrowDropdown />Low
                </div>
                <div className='info-value'>{kelvinLToF}°F</div>
              </div>
            </div>
          </div>
        </div>

        <strong>User Location:</strong>{` Lat: ${lat}, Long: ${lng}`}

        <div id='five-day-weather'>
          <div id='fdw-1'>
            1
          </div>
          <div id='fdw-2'>
            2
          </div>
          <div id='fdw-3'>
            3
          </div>
          <div id='fdw-4'>
            4
          </div>
          <div id='fdw-5'>
            5
          </div>
        </div>
      </div>

      <footer id='weather-footer'>
        {`Copyright © ${currentYear} Aaron Gertler. All rights reserved.`}
      </footer>
    </div>
  )
}

export default App
