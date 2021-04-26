import { round } from 'lodash'
import { Unit } from '../components/Forecast/Forecast.state'
import { ForecastData } from '../services/Forecast.service'

export default class TemperatureUtil {
  static fahrenheitToCelsius (fahrenheit: number) {
    return (fahrenheit - 32) * (5 / 9)
  }

  static convertToUnit (temperature: number, unit: Unit) {
    const converted = (unit === 'fahrenheit')
      ? temperature
      : this.fahrenheitToCelsius(temperature)
    return round(converted)
  }

  static withUnit (temperature: number, unit: Unit) {
    const symbols: Record<Unit, string> = {
      fahrenheit: '℉',
      celsius: '℃'
    }
    return `${temperature} ${symbols[unit]}`
  }

  static averageForecastTemp (forecast: ForecastData, unit: Unit) {
    const { temp_min: tempMin, temp_max: tempMax } = forecast.main
    const average = (tempMin + tempMax) / 2
    return this.convertToUnit(average, unit)
  }

  static averageSegmentTemp (segments: ForecastData[], unit: Unit) {
    const totalTemp = segments.reduce((temp, segment) => {
      return temp + this.averageForecastTemp(segment, unit)
    }, 0)
    const averageTemp = round((totalTemp / segments.length))
    return this.withUnit(averageTemp, unit)
  }
}
