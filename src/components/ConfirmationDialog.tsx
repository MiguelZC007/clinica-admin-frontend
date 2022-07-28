import * as React from 'react'
import Button from '@mui/material/Button'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Dialog from '@mui/material/Dialog'

import { DialogContentText } from '@mui/material'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

interface Props {
  open: boolean
  message?: string
  title?: string
  handleClose?: () => {}
  handleOk: () => {}
}

const ConfirmationDialog: React.FC<Props> = ({
  open,
  message,
  title,
  handleClose,
  handleOk,
  ...other
}) => {
  return (
    <Dialog
      maxWidth="xs"
      open={open}
      {...other}
      TransitionComponent={Transition}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>{' '}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="outlined" onClick={handleOk}>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog
