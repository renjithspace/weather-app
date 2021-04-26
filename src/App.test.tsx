import React from 'react'
import { RenderResult, screen, waitFor } from '@testing-library/react'
import { render } from './test-utils'
import App from './App'

let unmount: RenderResult['unmount']
function setOpenWeatherAPIKey (key: string | undefined) {
  process.env.REACT_APP_OPENWEATHER_LOCATION = key
}
beforeEach(() => {
  const result = render(<App/>);
  ({ unmount } = result)
})
afterEach(() => unmount())

describe('App component', () => {
  test('Should show loading when has no forecasts', () => {
    expect(screen.getByText(/Loading/)).toBeVisible()
  })

  test('Should show alert when has error in forecast request', async () => {
    const openWeatherAPIKey = process.env.REACT_APP_OPENWEATHER_LOCATION
    setOpenWeatherAPIKey('anInvalidKey')
    unmount()
    render(<App />)
    await waitFor(() => {
      expect(screen.getByTestId('alert')).toBeVisible()
    })
    setOpenWeatherAPIKey(openWeatherAPIKey)
  })

  test('Should show forecast after forecast load', async () => {
    await waitFor(() => {
      expect(screen.getAllByTestId('weatherCard')).toHaveLength(3)
    })
  })
})
