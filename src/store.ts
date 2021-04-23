import { combineReducers, createStore } from 'redux'
import { reducers as app } from './App.state'
import { reducers as alert } from './components/Alert/Alert.state'

const reducers = combineReducers({
  app,
  alert
})

export default createStore(reducers)
