// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import AppContextProvider from './context/AppContext'
import App from './App'

const renderApp = () =>
  render(
    <AppContextProvider>
      <App />
    </AppContextProvider>
  )

const mockGeolocation = (result: 'granted' | 'denied') => {
  const getCurrentPosition = vi.fn((success, failure) => {
    if (result === 'granted') {
      success({ coords: { latitude: 45.5, longitude: -122.6 } })
    } else {
      failure({ code: 1, PERMISSION_DENIED: 1 })
    }
  })
  vi.stubGlobal('navigator', { geolocation: { getCurrentPosition } })
}

const mockWeatherResponse = (ok = true) =>
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok,
    status: ok ? 200 : 500,
    json: async () => ({
      location: { name: 'Portland' },
      weather: {
        main: { temp: 20, feels_like: 18, temp_max: 25, temp_min: 10 },
        weather: [{ main: 'Rain' }],
      },
    }),
  }))

const spinner = () => document.querySelector('.spinner-container')

describe('App', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('shows weather and hides the spinner on success', async () => {
    mockGeolocation('granted')
    mockWeatherResponse()
    renderApp()

    expect(spinner()).not.toBeNull()
    expect(await screen.findByText('Rain')).toBeTruthy()
    expect(screen.getByText('Portland')).toBeTruthy()
    expect(screen.getByText('68° F')).toBeTruthy()
    expect(screen.queryByRole('alert')).toBeNull()
    expect(spinner()).toBeNull()
  })

  it('shows an error and hides the spinner when location is denied', async () => {
    mockGeolocation('denied')
    renderApp()

    expect((await screen.findByRole('alert')).textContent).toMatch(/denied/i)
    expect(spinner()).toBeNull()
    expect(screen.getAllByText('—').length).toBeGreaterThan(0)
  })

  it('shows an error and hides the spinner when the weather request fails', async () => {
    mockGeolocation('granted')
    mockWeatherResponse(false)
    renderApp()

    expect((await screen.findByRole('alert')).textContent).toMatch(/could not load/i)
    await waitFor(() => expect(spinner()).toBeNull())
  })
})
