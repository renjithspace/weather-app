import { ChartConfiguration } from 'chart.js'
import { Theme } from '@material-ui/core'
import { ForecastData } from './Forecast.service'
import { Unit } from '../components/Forecast/Forecast.state'
import DateUtil from '../utils/Date.utils'
import TemperatureUtil from '../utils/Temperature.util'

export interface WeatherChartConfig {
  forecast: ForecastData | null
  segments: ForecastData[]
  unit: Unit,
  theme: Theme
}

export default class ChartService {
  static weatherChart (config: WeatherChartConfig) {
    const { forecast, segments, unit, theme } = config
    const title = forecast
      ? DateUtil.dateFromDatetime(forecast.dt_txt)
      : ''
    const labels = segments.map(segement => {
      return DateUtil.timeFromDatetime(segement.dt_txt)
    })
    const dataset = segments.map(segement => {
      return TemperatureUtil.averageForecastTemp(segement, unit)
    })
    const data: ChartConfiguration['data'] = {
      labels: labels,
      datasets: [
        {
          label: 'Temperature',
          data: dataset,
          backgroundColor: theme.palette.secondary.main
        }
      ]
    }
    const options: ChartConfiguration['options'] = {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label (this, tooltipItems: any) {
              const { dataset, formattedValue } = tooltipItems
              const temperature = TemperatureUtil.withUnit(formattedValue, unit)
              return `${dataset.label}: ${temperature}`
            }
          }
        },
        legend: {
          labels: {
            font: {
              family: theme.typography.fontFamily
            }
          }
        },
        title: {
          display: true,
          text: title,
          font: {
            family: theme.typography.fontFamily,
            size: 15,
            weight: '500'
          }
        }
      },
      scales: {
        xAxes: {
          grid: { display: false, drawBorder: false }
        },
        yAxes: {
          angleLines: { display: false },
          grid: { display: false, drawBorder: false }
        }
      }
    }
    return { data, options }
  }
}
