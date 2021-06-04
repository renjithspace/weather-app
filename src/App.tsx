import React, { useEffect } from 'react'
import { Container } from '@material-ui/core'
import { connect } from 'react-redux'
import ForecastService, { ForecastListCancel } from './services/Forecast.service'
import { actions, selectors, AppSelectors, AppActions } from './App.state'
import Loading from './components/Loading/Loading'
import Forecast from './components/Forecast/Forecast'
import Alert from './components/Alert/Alert'

interface AppProps extends AppSelectors, AppActions {}

function App (props: AppProps) {
  function handleRefreshClick () {
    listForecast()
  }
  const children = props.hasForecasts
    ? <Forecast forecasts={props.forecasts} onRefresh={handleRefreshClick} />
    : <Loading/>
  let cancelListForecast: ForecastListCancel | null = null
  async function listForecast () {
    const [forecasts, cancel] = await ForecastService.list()
    cancelListForecast = cancel
    if (forecasts) props.replaceForecasts(forecasts)
  }
  useEffect(() => {
    listForecast()
  }, [])
  useEffect(() => {
    return function umount () {
      if (cancelListForecast) cancelListForecast()
    }
  })
  return (
    <Container maxWidth="md">
      {children}
      <Alert/>
    </Container>
  )
}

export default connect(selectors, actions)(App)
