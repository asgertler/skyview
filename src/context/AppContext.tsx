import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'

type WeatherContextType = {
    temp: number,
    feelsLike: number,
    high: number,
    low: number,
    description: string,
}

type AppContextType = {
    loading: boolean,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    city: string,
    setCity: Dispatch<SetStateAction<string>>,
    weather: WeatherContextType,
    setWeather: Dispatch<SetStateAction<WeatherContextType>>,
}

type AppContextProviderProps = {
    children: ReactNode,
}

export const AppContext = createContext<AppContextType | undefined>(undefined)

export default function AppContextProvider({ children }: AppContextProviderProps) {
    const [loading, setIsLoading] = useState<boolean>(true)
    const [city, setCity] = useState<string>('Unknown')
    const [weather, setWeather] = useState<WeatherContextType>({
        temp: 0,
        feelsLike: 0,
        high: 0,
        low: 0,
        description: '',
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