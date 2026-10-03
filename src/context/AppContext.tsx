import { useState } from 'react'
import { AppContext } from './appContextValue'
import { AppContextProviderProps, WeatherContextType } from '../types/types'

export default function AppContextProvider({ children }: AppContextProviderProps) {
    const [loading, setIsLoading] = useState<boolean>(true)
    const [city, setCity] = useState<string>('Unknown')
    const [weather, setWeather] = useState<WeatherContextType | null>(null)
    const [error, setError] = useState<string | null>(null)

    return (
        <AppContext.Provider value ={{
            loading,
            setIsLoading,
            city,
            setCity,
            weather,
            setWeather,
            error,
            setError,
        }}>
            {children}
        </AppContext.Provider>
    )
}