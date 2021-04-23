import { AnyAction } from 'redux'
import { cloneDeep } from 'lodash'

interface AlertState {
  message: string
}

export interface AlertActions {
  replaceMessage (message: string): AnyAction
  clearMessage (): AnyAction
}

export interface AlertSelectors extends AlertState {
  isOpen: boolean
}

const alert: AlertState = {
  message: ''
}

export const actions: AlertActions = {
  replaceMessage (message) {
    return { type: 'REPLACE_ALERT_MESSAGE', message }
  },
  clearMessage () {
    return { type: 'CLEAR_ALERT_MESSAGE' }
  }
}

export function reducers (state = alert, action: AnyAction) {
  switch (action.type) {
    case 'REPLACE_ALERT_MESSAGE':
      alert.message = action.message
      return cloneDeep(alert)
    case 'CLEAR_ALERT_MESSAGE':
      alert.message = ''
      return cloneDeep(alert)
    default:
      return state
  }
}

export function selectors (state: { alert: AlertState }): AlertSelectors {
  const currentState = cloneDeep(state.alert)
  const selectors = {
    isOpen: Boolean(state.alert.message)
  }
  return { ...currentState, ...selectors }
}
