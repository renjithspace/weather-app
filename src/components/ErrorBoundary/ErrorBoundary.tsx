import { Box, Typography } from '@material-ui/core'
import React, { Component } from 'react'
import styles from './ErrorBoundary.module.css'

interface ErrorBoundaryProps {}

interface ErrorBoundaryState {
  message: string | null
}

export default class ErrorBoundary
  extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor (props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      message: null
    }
  }

  static getDerivedStateFromError (error: Error) {
    return { message: error.message }
  }

  render () {
    if (this.state.message) {
      return (
        <div className={styles.root}>
          <Box>
            <Typography variant="h6">Something went wrong!</Typography>
            <Typography color="textSecondary">
              {this.state.message}
            </Typography>
          </Box>
        </div>
      )
    }
    return this.props.children
  }
}
