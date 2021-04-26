import { AnyAction } from 'redux'
import { ForecastData } from './services/Forecast.service'
import UtilService from './services/UtilService'

interface AppState {
  forecasts: ForecastData[]
}

export interface AppActions {
  replaceForecasts (forecasts: ForecastData[]): AnyAction
}

export interface AppSelectors extends AppState {
  hasForecasts: boolean
}

const app: AppState = {
  forecasts: []
}

export const actions: AppActions = {
  replaceForecasts (forecasts) {
    return { type: 'REPLACE_APP_FORECASTS', forecasts }
  }
}

export function reducers (state = app, action: AnyAction) {
  switch (action.type) {
    case 'REPLACE_APP_FORECASTS': {
      const forecasts = action.forecasts as ForecastData[]
      app.forecasts = forecasts.map(forecast => {
        forecast.date = UtilService.getDateFromDatetime(forecast.dt_txt)
        return forecast
      })
      return { ...app }
    }
    default:
      return state
  }
}

export function selectors (state: { app: AppState }) {
  const current = state.app
  const derived = {
    hasForecasts: Boolean(current.forecasts[0])
  }
  return { ...current, ...derived }
}
