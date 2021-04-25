import { ChartConfiguration } from 'chart.js'
import { Theme } from '@material-ui/core'
import { ForecastData } from './Forecast.service'
import { Unit } from '../components/Forecast/Forecast.state'
import UtilService from './UtilService'

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
      ? UtilService.humanizeDateFromDatetime(forecast.dt_txt)
      : ''
    const labels = segments.map(segement => {
      return UtilService.getTimeFromDatetime(segement.dt_txt)
    })
    const dataset = segments.map(segement => {
      return UtilService.averageTemperatureInUnit(segement, unit)
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
              const temperature = UtilService.withUnit(formattedValue, unit)
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
