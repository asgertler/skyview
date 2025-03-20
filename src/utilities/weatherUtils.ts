import { Dispatch, SetStateAction } from 'react'
import { WeatherContextType } from '../types/types'

export const cToF = (t: number) => Math.round((t * (9/5)) + 32)

export const fetchWeather = async (
    latitude: number, 
    longitude: number,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    setCity: Dispatch<SetStateAction<string>>,
    setWeather: Dispatch<SetStateAction<WeatherContextType>>,
) => {
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
            main: data.weather.weather[0].main,
        })
        setCity(data.location.name)
        }
    } catch (err) {
        console.error('Error fetching weather:', err)
    } finally {
        setIsLoading(false)
    }
}