import { WeatherContextType } from '../types/types'

export const cToF = (t: number) => Math.round((t * (9/5)) + 32)

export type WeatherResult = {
    city: string,
    weather: WeatherContextType,
}

export const fetchWeather = async (
    latitude: number,
    longitude: number,
): Promise<WeatherResult> => {
    const res = await fetch(`https://openweather-proxy.aaron-gertler.workers.dev?lat=${latitude}&lng=${longitude}`)
    if (!res.ok) {
        throw new Error(`Weather request failed (${res.status})`)
    }

    const data = await res.json()
    if (!data?.weather?.main || !data?.weather?.weather?.[0] || !data?.location) {
        throw new Error('Unexpected weather response')
    }

    return {
        city: data.location.name,
        weather: {
            temp: cToF(data.weather.main.temp),
            feelsLike: cToF(data.weather.main.feels_like),
            high: cToF(data.weather.main.temp_max),
            low: cToF(data.weather.main.temp_min),
            main: data.weather.weather[0].main,
        },
    }
}
