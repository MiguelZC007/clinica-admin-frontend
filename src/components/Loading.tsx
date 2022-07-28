import { Backdrop, CircularProgress } from '@mui/material'

interface Props {
  open: boolean
}

const Loading: React.FC<Props> = ({ open }) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 999 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default Loading
