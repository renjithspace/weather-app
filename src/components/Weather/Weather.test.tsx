import React from 'react'
import { fireEvent, RenderResult, screen } from '@testing-library/react'
import { render } from '../../test-utils'
import Weather from './Weather'
import ForecastService,
{
  ForecastData,
  ForecastList,
  WeatherData
} from '../../services/Forecast.service'
import UtilService from '../../services/UtilService'

let unmount: RenderResult['unmount'],
  rerender: RenderResult['rerender'],
  forecasts: ForecastList | null,
  forecast :ForecastData,
  weather: WeatherData
const getForecast = (index: number) => forecasts?.list[index]!
const getWeather = () => forecast.weather[0]
const handleClick = jest.fn()
beforeEach(async () => {
  [forecasts] = await ForecastService.list()
  forecast = getForecast(0)
  weather = getWeather()
  const result = render(
    <Weather
      forecast={forecast}
      unit="celsius"
      activeForecastDt={forecast.dt}
      onClick={handleClick}/>
  );
  ({ rerender, unmount } = result)
})
afterEach(() => unmount())

describe('Weather component', () => {
  test('Should set forecast data', () => {
    const temperature = UtilService.averageTemperatureWithUnit(forecast, 'celsius')
    const iconImage = ForecastService.iconImage(weather.icon)
    const date = UtilService.humanizeDate(forecast.dt_txt)
    expect(screen.getByText(temperature)).toBeVisible()
    expect(screen.getByText(weather.main)).toBeVisible()
    expect(screen.getByText(weather.description)).toBeVisible()
    expect(
      screen.getByAltText('Current weather icon')
        .getAttribute('src')
    ).toBe(iconImage)
    expect(screen.getByText(date)).toBeVisible()
  })

  test('Should covert temperature when change unit', () => {
    rerender(
      <Weather
        forecast={forecast}
        unit="fahrenheit"
        activeForecastDt={forecast.dt}
        onClick={handleClick}/>
    )
    const temp = UtilService.averageTemperatureWithUnit(forecast, 'fahrenheit')
    expect(screen.getByText(new RegExp(temp))).toBeVisible()
  })

  test('Should active forecast based on activeForecastDt', () => {
    const classList = () => screen.getByTestId('weatherCard').classList
    const activeClass = 'MuiPaper-elevation4'
    expect(classList().contains(activeClass)).toBeTruthy()
    const activeForecast = getForecast(1)
    rerender(
      <Weather
        forecast={forecast}
        unit="fahrenheit"
        activeForecastDt={activeForecast.dt}
        onClick={handleClick}/>
    )
    expect(classList().contains(activeClass)).toBeFalsy()
  })

  test('Should handle onClick', () => {
    fireEvent.click(screen.getByTestId('weatherCard'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
