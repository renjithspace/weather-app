import React, { useEffect } from 'react'
import { Container } from '@material-ui/core'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import ForecastService, { ForecastListCancel } from './services/Forecast.service'
import { actions, selectors, AppState, AppActions } from './App.state'
import Loading from './components/Loading/Loading'

interface AppProps extends AppState, AppActions {}

function App (props: AppProps) {
  const isLoading = isEmpty(props.forecasts.list)
  let cancelListForecast: ForecastListCancel | null = null
  async function listForecast () {
    const [forecasts, cancel] = await ForecastService.list()
    cancelListForecast = cancel
    if (forecasts) props.replaceForecasts(forecasts)
  }
  function handleMount () {
    listForecast()
  }
  function handleUnmount () {
    if (cancelListForecast) cancelListForecast()
  }
  useEffect(handleMount, [])
  useEffect(() => { return handleUnmount })
  return (
    <Container maxWidth="md">
      <Loading visibility={isLoading} />
    </Container>
  )
}

export default connect(selectors, actions)(App)
