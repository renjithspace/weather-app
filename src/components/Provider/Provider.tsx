import React, { ReactNode } from 'react'
import { Provider as StateProvider } from 'react-redux'
import { ThemeProvider } from '@material-ui/styles'
import store from '../../store'
import Alert from '../Alert/Alert'

// Strict mode issue: https://github.com/mui-org/material-ui/issues/13394
import { unstable_createMuiStrictModeTheme as createTheme } from '@material-ui/core'

interface ProviderProps {
  children: ReactNode
}

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif'
  }
})

export default function Provider (props: ProviderProps) {
  return (
    <StateProvider store={store}>
      <ThemeProvider theme={theme}>
        {props.children}
        <Alert />
      </ThemeProvider>
    </StateProvider>
  )
}
