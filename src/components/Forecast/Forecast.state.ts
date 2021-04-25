import { AnyAction } from 'redux'
import { cloneDeep, filter, find, slice, uniqBy } from 'lodash'
import { ForecastData } from '../../services/Forecast.service'
import { NavigateDirection } from '../NavigateButton/NavigateButton'
import { ForecastProps } from './Forecast'

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
      return cloneDeep(forecast)
    case 'INCREMENT_FORECAST_PAGE_INDEX':
      forecast.pageIndex = forecast.pageIndex + 1
      return cloneDeep(forecast)
    case 'DECREMENT_FORECAST_PAGE_INDEX':
      forecast.pageIndex = forecast.pageIndex - 1
      return cloneDeep(forecast)
    case 'REPLACE_FORECAST_ACTIVE_FORECAST_DT':
      forecast.activeForecastDt = action.dt
      return cloneDeep(forecast)
    default:
      return state
  }
}

export function selectors (state: { forecast: ForecastState }, props: ForecastProps): ForecastSelectors {
  const carouselSize = 3
  const current = cloneDeep(state.forecast)
  const derived = {
    get dailyForecasts () {
      return uniqBy(props.forecasts, 'date')
    },
    get activeForecasts () {
      const { pageIndex: startIndex } = current
      const endIndex = startIndex + carouselSize
      return slice(this.dailyForecasts, startIndex, endIndex)
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
      return find(this.dailyForecasts, { dt }) || null
    },
    get activeForecastSegments () {
      if (!this.activeForecast) return []
      const date = this.activeForecast.date
      return filter(props.forecasts, { date })
    }
  }
  return { ...current, ...derived }
}
