import React from 'react'
import ReactDOM from 'react-dom'
import { install } from 'resize-observer'
import CssBaseline from '@material-ui/core/CssBaseline'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import Provider from './components/Provider/Provider'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

// ResizeObserver polyfill https://github.com/chartjs/Chart.js/issues/8414
install()

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider>
        <App />
      </Provider>
      <CssBaseline/>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
