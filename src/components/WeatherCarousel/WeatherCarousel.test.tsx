import React from 'react'
import { fireEvent, RenderResult, screen } from '@testing-library/react'
import { render } from '../../test-utils'
import WeatherCarousel from './WeatherCarousel'
import ForecastService, { ForecastData } from '../../services/Forecast.service'

let unmount: RenderResult['unmount'],
  forecasts: ForecastData[],
  forecast: ForecastData
const handleNavigate = jest.fn()
const handleSelect = jest.fn()
beforeEach(async () => {
  const [response] = await ForecastService.list()
  forecasts = response as ForecastData[]
  forecast = forecasts[0]
  const result = render(
    <WeatherCarousel
      forecasts={forecasts}
      unit="celsius"
      navigators={['next', 'previous']}
      activeForecastDt={forecast.dt}
      onNavigate={handleNavigate}
      onSelect={handleSelect}/>
  );
  ({ unmount } = result)
})
afterEach(() => unmount())

describe('WeatherCarousel component', () => {
  test('Should show weather cards', () => {
    expect(
      screen.getAllByTestId('weatherCard')
    ).toHaveLength(forecasts.length)
  })

  test('Should handle onNavigate', () => {
    fireEvent.click(screen.getByTestId('buttonNext'))
    fireEvent.click(screen.getByTestId('buttonPrevious'))
    expect(handleNavigate).toHaveBeenCalledTimes(2)
  })

  test('Should handle onSelect', () => {
    fireEvent.click(screen.getAllByTestId('weatherCard')[0])
    expect(handleSelect).toHaveBeenCalledTimes(1)
  })
})
