import axios, { CancelTokenSource } from 'axios'

export default class RequestService {
  private source: CancelTokenSource

  constructor () {
    this.source = axios.CancelToken.source()
    this.cancel = this.cancel.bind(this)
  }

  cancel () {
    this.source.cancel()
  }

  async get (url: string) {
    try {
      const response = await axios.get(url)
      return response.data
    } catch (error) {
      const { response } = error
      const message = response ? response.data : error.message
      alert(message)
      return null
    }
  }
}
