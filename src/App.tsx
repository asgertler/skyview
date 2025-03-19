/// <reference types="vite-plugin-svgr/client" />

import { useEffect, useRef, useState } from "react"

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
import { IoMdArrowDropup, IoMdArrowDropdown, IoMdPin } from "react-icons/io"
import Logo from './assets/skyview-logo.svg?react'
import './App.sass'

function App() {
  const [loading, setIsLoading] = useState<boolean>(true)
  const [city, setCity] = useState<string>('Unknown')
  const [weather, setWeather] = useState<{
    temp: number,
    feelsLike: number,
    high: number,
    low: number,
    description: string,
  } | null>(null)
  
  const timeRef = useRef({ hours: new Date().getHours(), minutes: new Date().getMinutes() })

  const cToF = (t: number) => Math.round((t * (9/5)) + 32)

  const fetchWeather = async (latitude: number, longitude: number) => {
    try {
      setIsLoading(true)
  
      const res = await fetch(`https://openweather-proxy.aaron-gertler.workers.dev?lat=${latitude}&lng=${longitude}`)
      const data = await res.json()
  
      if (data.weather && data.location) {
        setWeather({
          temp: cToF(data.weather.main.temp),
          feelsLike: cToF(data.weather.main.feels_like),
          high: cToF(data.weather.main.temp_max),
          low: cToF(data.weather.main.temp_min),
          description: data.weather.weather[0].description,
        })
        setCity(data.location.name)
      }
    } catch (err) {
      console.error('Error fetching weather:', err)
    } finally {
      setIsLoading(false)
    }
  }
  

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords
          console.log(`Geolocation success: ${latitude}, ${longitude}`)
          fetchWeather(latitude, longitude)
        },
        (err) => {
          console.error("Error getting user location:", err)
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
        }
      )
    } else {
      console.error("Geolocation is not supported by this browser.")
    }
  }, [])

  const appVersion: string = import.meta.env.VITE_APP_VERSION as string
  const currentYear: number = new Date().getFullYear()

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date()
      timeRef.current = { hours: now.getHours(), minutes: now.getMinutes() }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

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
                <div className='info-value'>{weather ? `${weather.temp}° F` : '—'}</div>
              </div>

              <div className='cwr-info'>
                <div className='info-label'>Feels Like</div>
                <div className='info-value'>{weather ? `${weather.feelsLike}° F` : '—'}</div>
              </div>
            </div>

            <div className='cwr-info-stack'>
              <div className='cwr-info'>
                <div className='info-label'>
                  <IoMdArrowDropup />High
                </div>
                <div className='info-value'>{weather ? `${weather.high}° F` : '—'}</div>
              </div>

              <div className='cwr-info'>
                <div className='info-label'>
                  <IoMdArrowDropdown />Low
                </div>
                <div className='info-value'>{weather ? `${weather.low}° F` : '—'}</div>
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

        <div id='location'>
          <div id='location-city'>
            <IoMdPin />{`${city}`}
          </div>
          <div id='location-time'>
            {timeRef.current.hours} : {timeRef.current.minutes < 10 ? `0${timeRef.current.minutes}` : timeRef.current.minutes}
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
