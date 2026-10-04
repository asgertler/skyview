import { CSSProperties } from 'react'
import { IconType } from 'react-icons'
import {
  WiCloudy,
  WiDaySunny,
  WiDayHaze,
  WiDust,
  WiFog,
  WiNa,
  WiRain,
  WiSandstorm,
  WiShowers,
  WiSmoke,
  WiSnow,
  WiSprinkle,
  WiStrongWind,
  WiThunderstorm,
  WiTornado,
  WiVolcano,
} from 'react-icons/wi'

type IconEntry = { Icon: IconType, style?: CSSProperties }

// Keyed by OpenWeather's `weather[0].main`. `top` nudges optically align
// glyphs that sit differently within their viewBox.
const icons: Record<string, IconEntry> = {
  Clear: { Icon: WiDaySunny },
  Clouds: { Icon: WiCloudy },
  Drizzle: { Icon: WiShowers, style: { top: '12px' } },
  Mist: { Icon: WiSprinkle, style: { top: '12px' } },
  Rain: { Icon: WiRain, style: { top: '8px' } },
  Snow: { Icon: WiSnow, style: { top: '8px' } },
  Thunderstorm: { Icon: WiThunderstorm, style: { top: '6px' } },
  Fog: { Icon: WiFog },
  Haze: { Icon: WiDayHaze },
  Smoke: { Icon: WiSmoke },
  Dust: { Icon: WiDust },
  Sand: { Icon: WiSandstorm },
  Ash: { Icon: WiVolcano },
  Squall: { Icon: WiStrongWind },
  Tornado: { Icon: WiTornado },
}

const fallback: IconEntry = { Icon: WiNa, style: { fontSize: '9rem' } }

export default function WeatherIcon({ condition }: { condition?: string }) {
  const { Icon, style } = (condition && icons[condition]) || fallback
  return <Icon className='weather-icon' style={style} />
}
