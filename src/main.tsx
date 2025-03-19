import React from 'react'
import ReactDOM from 'react-dom/client'
import AppContextProvider from './context/AppContext.tsx'
import App from './App.tsx'
import './main.sass'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>,
)
