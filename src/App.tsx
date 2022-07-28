import React from 'react'
import AppRoutes from './router/AppRoutes'
import { ThemeProvider } from '@mui/material'
import { theme } from './material.config'
import CssBaseline from '@mui/material/CssBaseline'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  )
}

export default App
