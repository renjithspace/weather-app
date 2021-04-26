import moment from 'moment'

export default class DateUtil {
  static dateFromDatetime (datetime: string) {
    return moment(datetime).format('LL')
  }

  static timeFromDatetime (datetime: string) {
    return moment(datetime).format('LT')
  }
}
