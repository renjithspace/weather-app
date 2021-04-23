import React from 'react'
import { connect } from 'react-redux'
import { IconButton, Snackbar } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { actions, selectors, AlertSelectors, AlertActions } from './Alert.state'

interface AlertProps extends AlertSelectors, AlertActions {}

function Alert (props: AlertProps) {
  function handleClose () {
    props.clearMessage()
  }
  return (
    <Snackbar
      open={props.isOpen}
      message={props.message}
      autoHideDuration={6000}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}>
          <Close fontSize="small" />
        </IconButton>}
      onClose={handleClose}/>
  )
}

export default connect(selectors, actions)(Alert)
