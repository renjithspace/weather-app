import moment from 'moment'
import { round } from 'lodash'
import { Unit } from '../components/Forecast/Forecast.state'
import { ForecastData } from './Forecast.service'

export default class UtilService {
  static humanizeDate (date: string) {
    return moment(date).format('LLL')
  }

  static getDateFromDatetime (date: string) {
    return moment(date).format('L')
  }

  static humanizeDateFromDatetime (date: string) {
    return moment(date).format('LL')
  }

  static getTimeFromDatetime (date: string) {
    return moment(date).format('LT')
  }

  static averageTemperatureInUnit (forecast: ForecastData, unit: Unit) {
    const { temp_min: tempMin, temp_max: tempMax } = forecast.main
    const average = (tempMin + tempMax) / 2
    return this.convertUnit(unit, average)
  }

  static withUnit (temperature: number, unit: Unit) {
    return `${temperature} ${this.unitSymbol(unit)}`
  }

  static unitSymbol (unit: Unit) {
    const symbols: Record<Unit, string> = {
      fahrenheit: '℉',
      celsius: '℃'
    }
    return symbols[unit]
  }

  static fahrenheitToCelsius (fahrenheit: number) {
    return (fahrenheit - 32) * (5 / 9)
  }

  static convertUnit (from: Unit, temperature: number) {
    const converted = (from === 'fahrenheit')
      ? temperature
      : this.fahrenheitToCelsius(temperature)
    return round(converted)
  }
}
