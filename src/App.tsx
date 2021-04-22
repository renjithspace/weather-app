import React from 'react'
import { Container, createMuiTheme, ThemeProvider } from '@material-ui/core'

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Inter, sans-serif'
  }
})

function App () {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
      </Container>
    </ThemeProvider>
  )
}

export default App
