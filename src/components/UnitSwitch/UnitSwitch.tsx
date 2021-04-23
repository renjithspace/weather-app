import React, { ChangeEvent } from 'react'
import { Box, FormControlLabel, Grid, Paper, Radio } from '@material-ui/core'
import { Unit } from '../Forecast/Forecast.state'

interface UnitSwitchProps {
  unit: Unit
  onChange: (unit: Unit) => void
}

export default function UnitSwitch (props: UnitSwitchProps) {
  function handleChange (event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value as Unit
    props.onChange(value)
  }
  function isChecked (unit: Unit) {
    return (props.unit === unit)
  }
  return (
    <Grid
      container
      justify="center">
      <Grid
        item
        xs={6}>
        <Box my={4}>
          <Paper>
            <Grid
              container
              justify="center"
              spacing={2}>
              <Grid item>
                <FormControlLabel
                  name="unit"
                  value="celcius"
                  checked={isChecked('celcius')}
                  control={<Radio onChange={handleChange}/>}
                  label="Celcius"
                  data-testid="celsiusUnit"/>
              </Grid>
              <Grid item>
                <FormControlLabel
                  name="unit"
                  value="fahrenheit"
                  checked={isChecked('fahrenheit')}
                  control={<Radio onChange={handleChange}/>}
                  label="Fahrenheit"
                  data-testid="fahrenheitUnit"/>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  )
}
