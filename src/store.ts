import { combineReducers, createStore } from 'redux'
import { reducers as app } from './App.state'

const reducers = combineReducers({
  app
})

export default createStore(reducers)
