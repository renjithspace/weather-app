import React from 'react'
import { Box, Paper } from '@material-ui/core'
import { NavigateBeforeOutlined, NavigateNextOutlined } from '@material-ui/icons'
import { capitalize } from 'lodash'
import styles from './NavigateButton.module.css'

export type NavigateDirection = 'next' | 'previous'
export type NavigateHandleCallback = (direction: NavigateDirection) => void

interface NavigateButtonProps {
  visibility: boolean
  direction: NavigateDirection
  onNavigate: NavigateHandleCallback
}

export default function NavigateButton (props: NavigateButtonProps) {
  const visibility = props.visibility || null
  const testId = `button${capitalize(props.direction)}`
  const Icon = (props.direction === 'previous')
    ? NavigateBeforeOutlined
    : NavigateNextOutlined
  function handleClick () {
    props.onNavigate(props.direction)
  }
  return visibility &&
    <Paper
      className={styles.root}
      onClick={handleClick}
      data-testid={testId}>
      <Box
        p={1}
        mt={4}>
        <Icon/>
      </Box>
    </Paper>
}