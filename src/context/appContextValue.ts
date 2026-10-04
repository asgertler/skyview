import { createContext } from 'react'
import { AppContextType } from '../types/types'

export const AppContext = createContext<AppContextType | undefined>(undefined)
