import React, { ReactNode } from 'react'
import { Provider as StateProvider } from 'react-redux'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core'
import store from '../../store'

interface ProviderProps {
  children: ReactNode
}

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Inter, sans-serif'
  }
})

export default function Provider (props: ProviderProps) {
  return (
    <StateProvider store={store}>
      <ThemeProvider theme={theme}>
        {props.children}
      </ThemeProvider>
    </StateProvider>
  )
}
