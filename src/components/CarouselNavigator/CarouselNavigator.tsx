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
  const { navigators } = props
  const isNextOnlyNavigate = (
    !navigators.includes('previous') &&
    navigators.includes('next')
  )
  const justifyButtons = isNextOnlyNavigate ? 'flex-end' : 'space-between'
  const navigateButtons = navigators.map(navigator => (
    <Grid
      item
      key={navigator}>
      <NavigateButton
        direction={navigator}
        onNavigate={props.onNavigate} />
    </Grid>
  ))
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
            justify={justifyButtons}>
            {navigateButtons}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}
