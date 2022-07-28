import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#A96AA6'
    },
    secondary: {
      main: '#72C0C2'
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        fullWidth: true
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
        margin: 'normal'
      }
    }
  }
})
