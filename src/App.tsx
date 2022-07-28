import AppRoutes from './router/AppRoutes'
import { ThemeProvider } from '@mui/material'
import { theme } from './material.config'
import CssBaseline from '@mui/material/CssBaseline'
import WraperUtilities from './hocs/WraperUtilities'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WraperUtilities>
        <AppRoutes />
      </WraperUtilities>
    </ThemeProvider>
  )
}

export default App
