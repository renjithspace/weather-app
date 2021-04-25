import store from '../store'

export default class StateService {
  static pushMessage (message: string) {
    store.dispatch({ type: 'REPLACE_ALERT_MESSAGE', message })
  }

  static clearMessage () {
    store.dispatch({ type: 'CLEAR_ALERT_MESSAGE' })
  }
}
