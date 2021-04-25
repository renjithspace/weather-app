import { combineReducers, createStore } from 'redux'
import { reducers as app } from './App.state'
import { reducers as alert } from './components/Alert/Alert.state'
import { reducers as forecast } from './components/Forecast/Forecast.state'

const reducers = combineReducers({
  app,
  alert,
  forecast
})

export default createStore(reducers)
