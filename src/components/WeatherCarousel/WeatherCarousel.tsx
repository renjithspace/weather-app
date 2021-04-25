import React, { Fragment } from 'react'
import { Grid } from '@material-ui/core'
import { ForecastData } from '../../services/Forecast.service'
import { Unit } from '../Forecast/Forecast.state'
import { NavigateDirection, NavigateHandleCallback } from '../NavigateButton/NavigateButton'
import Weather, { WeatherClickHandler } from '../Weather/Weather'
import CarouselNavigator from '../CarouselNavigator/CarouselNavigator'

interface WeatherCarouselProps {
  forecasts: ForecastData[]
  unit: Unit
  navigators: NavigateDirection[]
  activeForecastDt: number
  onNavigate: NavigateHandleCallback
  onSelect: WeatherClickHandler
}

export default function WeatherCarousel (props: WeatherCarouselProps) {
  function renderWeather (forecast: ForecastData) {
    return (
      <Weather
        forecast={forecast}
        unit={props.unit}
        activeForecastDt={props.activeForecastDt}
        onClick={props.onSelect}
        key={forecast.dt}/>
    )
  }
  return (
    <Fragment>
      <CarouselNavigator
        onNavigate={props.onNavigate}
        navigators={props.navigators}/>
      <Grid
        container
        spacing={5}>
        {props.forecasts.map(renderWeather)}
      </Grid>
    </Fragment>
  )
}
