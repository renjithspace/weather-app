import React from 'react'
import { Card, CardContent, Grid, Typography } from '@material-ui/core'
import { ForecastData } from '../../services/Forecast.service'
import UtilService from '../../services/UtilService'
import { Unit } from '../Forecast/Forecast.state'

interface WeatherProps {
  forecast: ForecastData
  unit: Unit
}

export default function Weather (props: WeatherProps) {
  const { forecast, unit } = props
  const weather = forecast.weather[0]
  const icon = `http://openweathermap.org/img/wn/${weather.icon}.png`
  const unitSymbol = UtilService.unitSymbol(unit)
  const date = UtilService.humanizeDate(forecast.dt_txt)
  function temperature () {
    const { temp_min: tempMain, temp_max: tempMax } = forecast.main
    const average = (tempMain + tempMax) / 2
    const temperature = UtilService.convertUnit(unit, average)
    return { __html: `${temperature} ${unitSymbol}` }
  }
  return (
    <Grid
      item
      xs={4}>
      <Card>
        <CardContent>
          <Typography
            variant="h6"
            color="secondary"
            dangerouslySetInnerHTML={temperature()}>
          </Typography>
          <Typography
            variant="h6">
            {weather.main}
          </Typography>
          <Typography color="textSecondary">
            {weather.description}
          </Typography>
          <img
            src={icon}
            alt="Current weather icon"/>
          <Typography variant="subtitle2">
            {date}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}
