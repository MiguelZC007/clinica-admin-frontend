import { VariantType } from 'notistack'
import { createContext, useContext } from 'react'

export interface MainContextType {
  setLoading: (val: boolean) => void
  showNotify: (message: any, type?: VariantType) => void | null
  showConfirmation: (
    title: string,
    message?: string,
    handleConfirm?: () => void | null,
    handleClose?: () => void | null
  ) => void | null
}

export const MainContext = createContext<MainContextType>({
  setLoading: () => {},
  showConfirmation: () => {},
  showNotify: () => {}
})

export const useGlobalContext = () => useContext(MainContext)
