import { createContext, useState } from 'react'
import { AppContextProviderProps, AppContextType, WeatherContextType } from '../types/types'

export const AppContext = createContext<AppContextType | undefined>(undefined)

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