import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#72C0C2'
    },
    secondary: {
      main: '#A96AA6'
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        fullWidth: true,
        size: 'small'
      }
    },
    MuiIconButton: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiSvgIcon: {
      defaultProps: {
        fontSize: 'small'
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
        margin: 'normal',
        size: 'small'
      }
    },
    MuiTable: {
      defaultProps: {
        size: 'small',
        stickyHeader: true
      }
    },
    MuiTableRow: {
      defaultProps: {
        hover: true
      }
    },
    MuiFormControl: {
      defaultProps: {
        fullWidth: true,
        margin: 'normal'
      }
    },
    MuiInputLabel: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiSelect: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiPaper: {
      defaultProps: {
        variant: 'outlined'
      }
    },
    MuiSwitch: {
      defaultProps: {
        color: 'primary'
      }
    },
    MuiFormControlLabel: {
      defaultProps: {
        labelPlacement: 'start'
      }
    },
    MuiListItem: {
      defaultProps: {
        dense: true,
        divider: true,
        alignItems: 'flex-start'
      }
    },
    MuiTooltip: {
      defaultProps: {
        arrow: true,
        enterDelay: 1000
      }
    }
  }
})

export { theme }
