import ConfirmationDialog from '@/components/ConfirmationDialog'
import Loading from '@/components/Loading'
import { MainContext } from '@/contexts/MainContext'
import { useSnackbar, VariantType } from 'notistack'
import React, { useState } from 'react'

interface Props {
  children: JSX.Element
}

interface DialogProps {
  show: boolean
  title: string
  message?: string
  onConfirm: () => any
  onClose: () => any
}
const WraperUtilities: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const notistack = useSnackbar()
  const [dialog, setDialog] = useState<DialogProps>({
    show: false,
    title: '',
    message: '',
    onConfirm: () => {},
    onClose: () => {}
  })

  function showNotify(message: any, type?: VariantType) {
    if (typeof message === 'string') {
      notistack.enqueueSnackbar(message + '', {
        variant: type || 'success'
      })
    } else if (message?.response) {
      notistack.enqueueSnackbar(
        message.response?.data?.message
          ? message.response?.data?.message || ''
          : message.response?.status || '',
        { variant: 'error' }
      )
    }
  }

  function showConfirmation(
    title: string,
    message?: string,
    handleConfirm?: () => void | null,
    handleClose?: () => void | null
  ) {
    setDialog({
      show: true,
      title,
      message,
      onConfirm: function () {
        if (handleConfirm) handleConfirm()
        setDialog(prev => ({ ...prev, show: false }))
      },
      onClose: function () {
        if (handleClose) handleClose()
        setDialog(prev => ({ ...prev, show: false }))
      }
    })
  }

  return (
    <MainContext.Provider value={{ setLoading, showNotify, showConfirmation }}>
      {dialog.show && (
        <ConfirmationDialog
          open={dialog.show}
          title={dialog.title}
          message={dialog.message}
          handleOk={() => dialog.onConfirm()}
          handleClose={() => dialog.onClose()}
        />
      )}
      {loading && <Loading open={loading} />}
      {children}
    </MainContext.Provider>
  )
}

export default WraperUtilities
