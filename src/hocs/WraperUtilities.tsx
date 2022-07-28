import React, { useState } from 'react'
import Loading from '@/components/Loading'
import ConfirmationDialog from '@/components/ConfirmationDialog'
import { useSnackbar, VariantType } from 'notistack'
import { MainContext } from '@/contexts/MainContext'

interface Props {
  children: JSX.Element
}

const WraperUtilities: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const notistack = useSnackbar()
  const [dialog, setDialog] = useState({
    show: false,
    title: '',
    message: '',
    onConfirm: () => {},
    onClose: () => {}
  })

  function showNotify(message: any, type?: VariantType | undefined) {
    if (message?.response) {
      notistack.enqueueSnackbar(
        message.response?.data?.message
          ? message.response?.data?.message || ''
          : message.response?.status || '',
        { variant: 'error' }
      )
    } else if (typeof message === 'string') {
      notistack.enqueueSnackbar(message + '', {
        variant: type || 'success'
      })
    }
  }

  function showConfirmation(
    title: string,
    message: string,
    handleConfirm: () => {} | null,
    handleClose: () => {} | null
  ) {
    setDialog({
      show: true,
      title: title,
      message: message,
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
          handleOk={() => dialog.onConfirm}
          handleClose={() => dialog.onClose}
        />
      )}
      {loading && <Loading open={loading} />}
      {children}
    </MainContext.Provider>
  )
}

export default WraperUtilities
