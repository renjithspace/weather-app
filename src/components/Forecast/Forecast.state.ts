import { AnyAction } from 'redux'
import { uniqBy } from 'lodash'
import { ForecastData } from '../../services/Forecast.service'
import { NavigateDirection } from '../NavigateButton/NavigateButton'
import { ForecastProps } from './Forecast'
import ForecastUtil from '../../utils/Forecast.util'

export type Unit = 'celsius' | 'fahrenheit'

interface ForecastState {
  unit: Unit
  pageIndex: number
  activeForecastDt: ForecastData['dt']
}

export interface ForecastActions {
  replaceUnit (unit: Unit): AnyAction
  incrementPageIndex (): AnyAction
  decrementPageIndex (): AnyAction,
  replaceActiveForecastDt (dt: number): AnyAction
}

export interface ForecastSelectors extends ForecastState {
  dailyForecasts: ForecastData[]
  activeForecasts: ForecastData[]
  activeForecastsSegments: ForecastData[]
  carouselNavigators: NavigateDirection[]
  activeForecast: ForecastData | null
  activeForecastSegments: ForecastData[]
}

const forecast: ForecastState = {
  unit: 'fahrenheit',
  pageIndex: 0,
  activeForecastDt: 0
}

export const actions: ForecastActions = {
  replaceUnit (unit) {
    return { type: 'REPLACE_FORECAST_UNIT', unit }
  },
  incrementPageIndex () {
    return { type: 'INCREMENT_FORECAST_PAGE_INDEX' }
  },
  decrementPageIndex () {
    return { type: 'DECREMENT_FORECAST_PAGE_INDEX' }
  },
  replaceActiveForecastDt (dt) {
    return { type: 'REPLACE_FORECAST_ACTIVE_FORECAST_DT', dt }
  }
}

export function reducers (state = forecast, action: AnyAction) {
  switch (action.type) {
    case 'REPLACE_FORECAST_UNIT':
      forecast.unit = action.unit
      return { ...forecast }
    case 'INCREMENT_FORECAST_PAGE_INDEX':
      forecast.pageIndex = forecast.pageIndex + 1
      return { ...forecast }
    case 'DECREMENT_FORECAST_PAGE_INDEX':
      forecast.pageIndex = forecast.pageIndex - 1
      return { ...forecast }
    case 'REPLACE_FORECAST_ACTIVE_FORECAST_DT':
      forecast.activeForecastDt = action.dt
      return { ...forecast }
    default:
      return state
  }
}

export function selectors (state: { forecast: ForecastState }, props: ForecastProps): ForecastSelectors {
  const carouselSize = 3
  const current = state.forecast
  const derived = {
    get dailyForecasts () {
      return uniqBy(props.forecasts, 'date')
    },
    get activeForecasts () {
      const { pageIndex: startIndex } = current
      return this.dailyForecasts.splice(startIndex, carouselSize)
    },
    get activeForecastsSegments () {
      return ForecastUtil.segmentsFromForecasts(this.activeForecasts, props.forecasts)
    },
    get carouselNavigators () {
      const navigators: NavigateDirection[] = []
      const canPrevious = current.pageIndex > 0
      const canNext = this.dailyForecasts[current.pageIndex + carouselSize]
      if (canPrevious) navigators.push('previous')
      if (canNext) navigators.push('next')
      return navigators
    },
    get activeForecast () {
      const { activeForecastDt: dt } = current
      const active = this.dailyForecasts.find(forecast => (forecast.dt === dt))
      return active || null
    },
    get activeForecastSegments () {
      if (!this.activeForecast) return []
      return ForecastUtil.segmentsFromForecast(this.activeForecast, props.forecasts)
    }
  }
  return { ...current, ...derived }
}
