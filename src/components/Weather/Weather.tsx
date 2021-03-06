import React from 'react'
import { Card, CardContent, Grid, Typography } from '@material-ui/core'
import ForecastService, { ForecastData } from '../../services/Forecast.service'
import { Unit } from '../Forecast/Forecast.state'
import DateUtil from '../../utils/Date.utils'
import TemperatureUtil from '../../utils/Temperature.util'
import styles from './Weather.module.css'

export type WeatherClickHandler = (dt: number) => void

interface WeatherProps {
  forecast: ForecastData
  segments: ForecastData[]
  unit: Unit
  activeForecastDt: number
  onClick: WeatherClickHandler
}

export default function Weather (props: WeatherProps) {
  const { forecast, unit, activeForecastDt } = props
  const weather = forecast.weather[0]
  const iconImage = ForecastService.iconImage(weather.icon)
  const date = DateUtil.dateFromDatetime(forecast.dt_txt)
  const temperature = TemperatureUtil.averageSegmentTemp(props.segments, unit)
  const isActive = (forecast.dt === activeForecastDt)
  const elevation = isActive ? 4 : 1
  function handleClick () {
    props.onClick(forecast.dt)
  }
  return (
    <Grid
      item
      xs={12}
      sm={4}>
      <Card
        className={styles.card}
        elevation={elevation}
        onClick={handleClick}
        data-testid="weatherCard">
        <CardContent>
          <Typography
            variant="h6"
            color="secondary">
            {temperature}
          </Typography>
          <Typography variant="h6">
            {weather.main}
          </Typography>
          <Typography color="textSecondary">
            {weather.description}
          </Typography>
          <img
            className={styles.icon}
            src={iconImage}
            alt="Current weather icon"/>
          <Typography variant="subtitle2">
            {date}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}
