import moment from 'moment'
import { round } from 'lodash'
import { Unit } from '../components/Forecast/Forecast.state'

export default class UtilService {
  static humanizeDate (date: string) {
    return moment(date).format('lll')
  }

  static unitSymbol (unit: Unit) {
    const symbols: Record<Unit, string> = {
      fahrenheit: '&#8457;',
      celcius: '&#8451;'
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
