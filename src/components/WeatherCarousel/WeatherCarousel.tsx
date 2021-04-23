import React from 'react'
import { Grid } from '@material-ui/core'
import { ForecastData } from '../../services/Forecast.service'
import { Unit } from '../Forecast/Forecast.state'
import Weather from '../Weather/Weather'

interface WeatherCarouselProps {
  forecasts: ForecastData[]
  unit: Unit
}

export default function WeatherCarousel (props: WeatherCarouselProps) {
  function renderWeather (forecast: ForecastData) {
    return (
      <Weather
        forecast={forecast}
        unit={props.unit}
        key={forecast.dt}/>
    )
  }
  return (
    <Grid
      container
      spacing={5}>
      {props.forecasts.map(renderWeather)}
    </Grid>
  )
}
