import RequestService from './Request.service'

interface WeatherData {
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
}

export interface ForecastList {
  list: ForecastData[]
}

export type ForecastListCancel = () => void
type ForecastListResult = [ForecastList | null, ForecastListCancel]

export default class ForecastService {
  static async list (): Promise<ForecastListResult> {
    const endpoint = 'http://api.openweathermap.org/data/2.5/forecast'
    const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY
    const location = process.env.REACT_APP_OPENWEATHER_LOCATION
    const days = 40
    const url = `${endpoint}?q=${location}&APPID=${apiKey}&cnt=${days}&units=imperial`
    const request = new RequestService()
    const response = await request.get(url)
    return [response, request.cancel]
  }
}
