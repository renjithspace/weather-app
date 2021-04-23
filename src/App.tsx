import React, { useEffect } from 'react'
import { Container, createMuiTheme, ThemeProvider } from '@material-ui/core'
import { connect } from 'react-redux'
import { isEmpty } from 'lodash'
import ForecastService, { ForecastListCancel } from './services/Forecast.service'
import { actions, selectors, AppState, AppActions } from './App.state'
import Loading from './components/Loading/Loading'

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Inter, sans-serif'
  }
})

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
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Loading visibility={isLoading} />
      </Container>
    </ThemeProvider>
  )
}

export default connect(selectors, actions)(App)
