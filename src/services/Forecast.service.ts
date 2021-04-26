import RequestService from './Request.service'

export interface WeatherData {
  main: string
  description: string
  icon: string
}

export interface ForecastData {
  dt: number
  main: {
    'temp_min': number
    'temp_max': number
  }
  weather: WeatherData[]
  'dt_txt': string
  date?: string
}

export type ForecastListCancel = () => void
type ForecastListResult = [ForecastData[] | null, ForecastListCancel]

export default class ForecastService {
  static async list (): Promise<ForecastListResult> {
    const endpoint = 'https://api.openweathermap.org/data/2.5/forecast'
    const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY
    const location = process.env.REACT_APP_OPENWEATHER_LOCATION
    const days = 40
    const url = `${endpoint}?q=${location}&APPID=${apiKey}&cnt=${days}&units=imperial`
    const request = new RequestService()
    const response = await request.get(url)
    const result = response ? response.list : []
    return [result, request.cancel]
  }

  static iconImage (icon: WeatherData['icon']) {
    return `http://openweathermap.org/img/wn/${icon}.png`
  }
}
