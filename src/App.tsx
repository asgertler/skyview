/// <reference types='vite-plugin-svgr/client' />

import { ReactNode, useContext, useEffect, useState } from 'react'
import { AppContext } from './context/appContextValue'
import { fetchWeather } from './utilities/weatherUtils'
import Spinner from './components/Spinner'
import { 
  WiCloudy,
  WiDaySunny,
  WiNa,
  WiRain,
  WiShowers,
  WiSnow,
  WiSprinkle,
  WiThunderstorm,
} from 'react-icons/wi'
import { IoMdArrowDropup, IoMdArrowDropdown, IoMdPin } from 'react-icons/io'
import Logo from './assets/skyview-logo.svg?react'
import './App.sass'

function App() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('AppContext must be used within a Provider')
  }
  const {
    loading,
    setIsLoading,
    city,
    setCity,
    weather,
    setWeather,
    error,
    setError,
  } = context

  const appVersion: string = import.meta.env.VITE_APP_VERSION as string

  const weatherIcon = () => {
    const weatherIcons: { [key: string]: ReactNode } = {
      Clear: <WiDaySunny style={{ fontSize: '8rem' }} />,
      Clouds: <WiCloudy style={{ fontSize: '8rem' }} />,
      Drizzle: <WiShowers style={{ fontSize: '8rem', top: '12px' }} />,
      Mist: <WiSprinkle style={{ fontSize: '8rem', top: '12px' }} />,
      Rain: <WiRain style={{ fontSize: '8rem', top: '8px' }} />,
      Snow: <WiSnow style={{ fontSize: '8rem', top: '8px' }} />,
      Thunderstorm: <WiThunderstorm style={{ fontSize: '8rem', top: '6px' }} />,
    }
    return weatherIcons[weather?.main ?? ''] || <WiNa style={{ fontSize: '9rem' }} />
  }

  useEffect(() => {
    let cancelled = false

    const fail = (message: string) => {
      if (cancelled) return
      setError(message)
      setIsLoading(false)
    }

    if (!('geolocation' in navigator)) {
      fail('Geolocation is not supported by this browser.')
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords
        try {
          const result = await fetchWeather(latitude, longitude)
          if (cancelled) return
          setCity(result.city)
          setWeather(result.weather)
          setError(null)
          setIsLoading(false)
        } catch (err) {
          console.error('Error fetching weather:', err)
          fail('Could not load weather data. Please try again later.')
        }
      },
      (err) => {
        console.error('Error getting user location:', err)
        fail(
          err.code === err.PERMISSION_DENIED
            ? 'Location access was denied. Allow location access to see your local weather.'
            : 'Could not determine your location.'
        )
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
      }
    )

    return () => {
      cancelled = true
    }
  }, [setCity, setError, setIsLoading, setWeather])

  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const intervalId = setInterval(() => setNow(new Date()), 15000)
    return () => clearInterval(intervalId)
  }, [])

  const currentYear: number = new Date().getFullYear()

  return (
    <>
      <div className='weather-container'>
        <header className='weather-header'>
          <Logo className='main-logo' />
            <div className='version'>
              v{appVersion}
            </div>
        </header>

        {error && <div className='weather-error' role='alert'>{error}</div>}

        <div className='weather-info'>
          <div className='current-weather'>
            <div className='cw-left'>
              {weatherIcon()}
            </div>

            <div className='cw-right'>
              <h2>{weather?.main ?? '—'}</h2>
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

          {/* <div className='five-day-weather'>
            <div className='fdw-1'>
              1
            </div>
            <div className='fdw-2'>
              2
            </div>
            <div className='fdw-3'>
              3
            </div>
            <div className='fdw-4'>
              4
            </div>
            <div className='fdw-5'>
              5
            </div>
          </div> */}

          <div className='location'>
            <div className='location-city'>
              <IoMdPin />{city}
            </div>
            <div className='location-time'>
              {now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
            </div>
          </div>
        </div>

        <footer className='weather-footer'>
          {`Copyright © ${currentYear} Aaron Gertler. All rights reserved.`}
        </footer>
      </div>

      {loading ? <Spinner /> : ''}
    </>
  )
}

export default App
