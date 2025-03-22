import { Dispatch, ReactNode, SetStateAction } from 'react'

export type WeatherContextType = {
    temp: number,
    feelsLike: number,
    high: number,
    low: number,
    main: string,
}

export type AppContextType = {
    loading: boolean,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    city: string,
    setCity: Dispatch<SetStateAction<string>>,
    weather: WeatherContextType,
    setWeather: Dispatch<SetStateAction<WeatherContextType>>,
}

export type AppContextProviderProps = {
    children: ReactNode
}