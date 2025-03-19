import { createContext, useState } from 'react'
import { AppContextProviderProps, AppContextType, WeatherContextType } from '../types/types'

export const AppContext = createContext<AppContextType | undefined>(undefined)

export default function AppContextProvider({ children }: AppContextProviderProps) {
    const [loading, setIsLoading] = useState<boolean>(true)
    const [city, setCity] = useState<string>('Unknown')
    const [weather, setWeather] = useState<WeatherContextType>({
        temp: 0,
        feelsLike: 0,
        high: 0,
        low: 0,
        main: '',
    })

    return (
        <AppContext.Provider value ={{
            loading,
            setIsLoading,
            city,
            setCity,
            weather,
            setWeather,
        }}>
            {children}
        </AppContext.Provider>
    )
}