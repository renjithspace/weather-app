import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { ForecastData } from '../../services/Forecast.service'
import { Unit } from '../Forecast/Forecast.state'
import { NavigateDirection, NavigateHandleCallback } from '../NavigateButton/NavigateButton'
import Weather, { WeatherClickHandler } from '../Weather/Weather'
import ForecastUtil from '../../utils/Forecast.util'
import CarouselNavigator from '../CarouselNavigator/CarouselNavigator'

interface WeatherCarouselProps {
  forecasts: ForecastData[]
  segments: ForecastData[]
  unit: Unit
  navigators: NavigateDirection[]
  activeForecastDt: number
  onNavigate: NavigateHandleCallback
  onSelect: WeatherClickHandler
}

export default function WeatherCarousel (props: WeatherCarouselProps) {
  function renderWeather (forecast: ForecastData) {
    const segments = ForecastUtil.getSegmentsFromForecast(forecast, props.segments)
    return (
      <Weather
        forecast={forecast}
        segments={segments}
        unit={props.unit}
        activeForecastDt={props.activeForecastDt}
        onClick={props.onSelect}
        key={forecast.dt}/>
    )
  }
  return (
    <Box data-testid="weatherCarousel">
      <CarouselNavigator
        onNavigate={props.onNavigate}
        navigators={props.navigators}/>
      <Grid
        container
        spacing={3}>
        {props.forecasts.map(renderWeather)}
      </Grid>
    </Box>
  )
}
