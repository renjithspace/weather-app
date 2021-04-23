import { AnyAction } from 'redux'
import { cloneDeep } from 'lodash'
import { ForecastList } from './services/Forecast.service'

export interface AppState {
  forecasts: ForecastList
}

export interface AppActions {
  replaceForecasts (forecasts: ForecastList): AnyAction
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
  return cloneDeep(state.app)
}
