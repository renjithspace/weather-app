import React from 'react'
import { RenderResult, screen } from '@testing-library/react'
import { render } from '../../test-utils'
import ForecastService, { ForecastData } from '../../services/Forecast.service'
import Forecast from './Forecast'

let unmount: RenderResult['unmount']
beforeEach(async () => {
  const [response] = await ForecastService.list()
  const forecasts = response as ForecastData[]
  const result = render(<Forecast forecasts={forecasts}/>);
  ({ unmount } = result)
})
afterEach(() => unmount())

describe('Forecast component', () => {
  test('Should render unit switch', () => {
    expect(screen.getByTestId('unitSwitch')).toBeVisible()
  })

  test('Should render weather carousel', () => {
    expect(screen.getByTestId('weatherCarousel')).toBeVisible()
  })

  test('Should render weather chart', () => {
    expect(screen.getByTestId('weatherChart')).toBeVisible()
  })
})
