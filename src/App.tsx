import {
  TiWeatherCloudy,
  TiWeatherDownpour,
  TiWeatherNight,
  TiWeatherPartlySunny,
  TiWeatherShower,
  TiWeatherSnow,
  TiWeatherStormy,
  TiWeatherSunny,
  TiWeatherWindy,
  TiWeatherWindyCloudy
} from 'react-icons/ti'

import Logo from './assets/skyview-logo.svg?react'

import './App.css'

function App() {
  const appVersion = process.env.npm_package_version
  const currentYear = new Date().getFullYear()
  const defaultLat = '36.174465'
  const defaultLon = '-86.767960'

  // test data
  const kelvinTemp = 292.07
  const kelvinToF = ((kelvinTemp-273.15)*9/5 + 32).toString().split('.')[0]
  const kelvinFeelsLikeTemp = 291.66
  const kelvinFeelsLikeToF = ((kelvinFeelsLikeTemp-273.15)*9/5 + 32).toString().split('.')[0]
  const kelvinHigh = 293.21
  const kelvinHToF = ((kelvinHigh-273.15)*9/5 + 32).toString().split('.')[0]
  const kelvinLow = 290.05
  const kelvinLToF = ((kelvinLow-273.15)*9/5 + 32).toString().split('.')[0]

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
            <TiWeatherCloudy />
            <p>Cloudy</p>
          </div>

          <div id='cw-right'>
            <div className='cwr-info-row'>
              <div className='cwr-info'>
                <div className='info-label'>Temp</div>
                <div className='info-value'>{kelvinToF}°F</div>
              </div>

              <div className='cwr-info'>
                <div className='info-label'>Feels Like</div>
                <div className='info-value'>{kelvinFeelsLikeToF}°F</div>
              </div>
            </div>

            <div className='cwr-info-row'>
              <div className='cwr-info'>
                <div className='info-label'>High</div>
                <div className='info-value'>{kelvinHToF}°F</div>
              </div>

              <div className='cwr-info'>
                <div className='info-label'>Low</div>
                <div className='info-value'>{kelvinLToF}°F</div>
              </div>
            </div>
          </div>
        </div>

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
