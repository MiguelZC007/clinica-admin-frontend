import { ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { SnackbarProvider } from 'notistack'
import WraperUtilities from './hocs/WraperUtilities'
import { theme } from './material.config'
import AppRoutes from './router/AppRoutes'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        preventDuplicate
      >
        <WraperUtilities>
          <AppRoutes />
        </WraperUtilities>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
