import { ForecastData } from '../services/Forecast.service'

export default class ForecastUtil {
  static getSegmentsFromForecast (activeForecast: ForecastData, forecasts: ForecastData[]) {
    return forecasts.filter(forecast => (forecast.date === activeForecast.date))
  }

  static getSegmentsFromForecasts (activeForecasts: ForecastData[], forecasts: ForecastData[]) {
    const activeDates = activeForecasts.map(forecast => forecast.date)
    return forecasts.filter(forecast => activeDates.includes(forecast.date))
  }
}
