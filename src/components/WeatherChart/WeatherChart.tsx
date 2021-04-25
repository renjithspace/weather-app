import React from 'react'
import { Box, Card, CardContent, Grid } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { Bar } from 'react-chartjs-2'
import { Unit } from '../Forecast/Forecast.state'
import { ForecastData } from '../../services/Forecast.service'
import ChartService, { WeatherChartConfig } from '../../services/Chart.service'

interface WeatherChartProps {
  forecast: ForecastData | null
  segments: ForecastData[]
  unit: Unit
}

export default function WeatherChart (props: WeatherChartProps) {
  const { forecast, segments, unit } = props
  const theme = useTheme()
  const config: WeatherChartConfig = { forecast, segments, unit, theme }
  const { data, options } = ChartService.weatherChart(config)
  return (
    <Grid container>
      <Grid
        item
        xs={12}>
        <Box my={3}>
          <Card>
            <CardContent>
              <Bar
                type="bar"
                data={data}
                options={options} />
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  )
}
