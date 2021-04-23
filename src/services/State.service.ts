import store from '../store'

export default class StateService {
  static replaceAlertMessage (message: string) {
    store.dispatch({ type: 'REPLACE_ALERT_MESSAGE', message })
  }
}
