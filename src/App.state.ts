import { AnyAction } from 'redux'
import { cloneDeep, isEmpty } from 'lodash'
import { ForecastList } from './services/Forecast.service'

interface AppState {
  forecasts: ForecastList
}

export interface AppActions {
  replaceForecasts (forecasts: ForecastList): AnyAction
}

export interface AppSelectors extends AppState {
  hasForecasts: boolean
}

const app: AppState = {
  forecasts: {
    list: []
  }
}

export const actions: AppActions = {
  replaceForecasts (forecasts) {
    return { type: 'REPLACE_APP_FORECASTS', forecasts }
  }
}

export function reducers (state = app, action: AnyAction) {
  switch (action.type) {
    case 'REPLACE_APP_FORECASTS':
      app.forecasts = action.forecasts
      return cloneDeep(app)
    default:
      return state
  }
}

export function selectors (state: { app: AppState }) {
  const current = cloneDeep(state.app)
  const derived = {
    hasForecasts: !isEmpty(current.forecasts.list)
  }
  return { ...current, ...derived }
}
