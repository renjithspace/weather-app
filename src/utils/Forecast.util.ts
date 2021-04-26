import { ForecastData } from '../services/Forecast.service'

export default class ForecastUtil {
  static segmentsFromForecast (activeForecast: ForecastData, forecasts: ForecastData[]) {
    return forecasts.filter(forecast => (forecast.date === activeForecast.date))
  }

  static segmentsFromForecasts (activeForecasts: ForecastData[], forecasts: ForecastData[]) {
    const activeDates = activeForecasts.map(forecast => forecast.date)
    return forecasts.filter(forecast => activeDates.includes(forecast.date))
  }
}
