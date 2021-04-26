import React from 'react'
import { fireEvent, RenderResult, screen } from '@testing-library/react'
import { render } from '../../test-utils'
import Weather from './Weather'
import ForecastService,
{
  ForecastData,
  WeatherData
} from '../../services/Forecast.service'
import ForecastUtil from '../../utils/Forecast.util'
import DateUtil from '../../utils/Date.utils'
import TemperatureUtil from '../../utils/Temperature.util'

let unmount: RenderResult['unmount'],
  rerender: RenderResult['rerender'],
  forecasts: ForecastData[],
  segments: ForecastData[],
  forecast :ForecastData,
  weather: WeatherData
const getForecast = (index: number) => forecasts[index]
const getWeather = () => forecast.weather[0]
const handleClick = jest.fn()
beforeEach(async () => {
  const [response] = await ForecastService.list()
  forecasts = response as ForecastData[]
  forecast = getForecast(0)
  segments = ForecastUtil.segmentsFromForecast(forecast, forecasts)
  weather = getWeather()
  const result = render(
    <Weather
      forecast={forecast}
      segments={segments}
      unit="celsius"
      activeForecastDt={forecast.dt}
      onClick={handleClick}/>
  );
  ({ rerender, unmount } = result)
})
afterEach(() => unmount())

describe('Weather component', () => {
  test('Should set forecast data', () => {
    const temperature = TemperatureUtil.averageSegmentTemp(segments, 'celsius')
    const iconImage = ForecastService.iconImage(weather.icon)
    const date = DateUtil.dateFromDatetime(forecast.dt_txt)
    expect(screen.getByText(temperature)).toBeVisible()
    expect(screen.getByText(weather.main)).toBeVisible()
    expect(screen.getByText(weather.description)).toBeVisible()
    expect(
      screen.getByAltText('Current weather icon')
    ).toHaveAttribute('src', iconImage)
    expect(screen.getByText(date)).toBeVisible()
  })

  test('Should covert temperature when change unit', () => {
    rerender(
      <Weather
        forecast={forecast}
        segments={segments}
        unit="fahrenheit"
        activeForecastDt={forecast.dt}
        onClick={handleClick}/>
    )
    const temp = TemperatureUtil.averageSegmentTemp(segments, 'fahrenheit')
    expect(screen.getByText(new RegExp(temp))).toBeVisible()
  })

  test('Should active forecast based on activeForecastDt', () => {
    const activeClass = 'MuiPaper-elevation4'
    expect(screen.getByTestId('weatherCard')).toHaveClass(activeClass)
    const activeForecast = getForecast(1)
    rerender(
      <Weather
        forecast={forecast}
        segments={segments}
        unit="fahrenheit"
        activeForecastDt={activeForecast.dt}
        onClick={handleClick}/>
    )
    expect(screen.getByTestId('weatherCard')).not.toHaveClass(activeClass)
  })

  test('Should handle onClick', () => {
    fireEvent.click(screen.getByTestId('weatherCard'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
