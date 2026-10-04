import { afterEach, describe, expect, it, vi } from 'vitest'
import { cToF, fetchWeather } from './weatherUtils'

describe('cToF', () => {
  it('converts and rounds', () => {
    expect(cToF(0)).toBe(32)
    expect(cToF(100)).toBe(212)
    expect(cToF(-40)).toBe(-40)
    expect(cToF(21.5)).toBe(71)
  })
})

const mockFetch = (body: unknown, ok = true, status = 200) =>
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok,
    status,
    json: async () => body,
  }))

const validBody = {
  location: { name: 'Portland' },
  weather: {
    main: { temp: 20, feels_like: 18, temp_max: 25, temp_min: 10 },
    weather: [{ main: 'Clouds' }],
  },
}

describe('fetchWeather', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('maps the API response and converts to °F', async () => {
    mockFetch(validBody)
    await expect(fetchWeather(45.5, -122.6)).resolves.toEqual({
      city: 'Portland',
      weather: { temp: 68, feelsLike: 64, high: 77, low: 50, main: 'Clouds' },
    })
  })

  it('passes coordinates to the proxy', async () => {
    mockFetch(validBody)
    await fetchWeather(45.5, -122.6)
    expect(vi.mocked(fetch).mock.calls[0][0]).toContain('lat=45.5&lng=-122.6')
  })

  it('throws on a non-OK response', async () => {
    mockFetch({}, false, 500)
    await expect(fetchWeather(0, 0)).rejects.toThrow('500')
  })

  it('throws on an unexpected payload', async () => {
    mockFetch({ location: { name: 'X' } })
    await expect(fetchWeather(0, 0)).rejects.toThrow('Unexpected')
  })
})
