import React from 'react'
import { Box, Grid } from '@material-ui/core'
import NavigateButton,
{
  NavigateDirection,
  NavigateHandleCallback
} from '../NavigateButton/NavigateButton'

interface CarouselNavigatorProps {
  navigators: NavigateDirection[]
  onNavigate: NavigateHandleCallback
}

export default function CarouselNavigator (props: CarouselNavigatorProps) {
  function isVisible (direction: NavigateDirection) {
    return props.navigators.includes(direction)
  }
  return (
    <Grid
      container
      justify="center">
      <Grid
        item
        xs={8}>
          <Box mb={3}>
            <Grid
              container
              justify="space-between">
              <Grid item>
                <NavigateButton
                  visibility={isVisible('previous')}
                  direction="previous"
                  onNavigate={props.onNavigate} />
              </Grid>
              <Grid item>
              <NavigateButton
                visibility={isVisible('next')}
                direction="next"
                onNavigate={props.onNavigate} />
              </Grid>
            </Grid>
          </Box>
        </Grid>
    </Grid>
  )
}
