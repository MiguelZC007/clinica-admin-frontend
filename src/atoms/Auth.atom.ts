import encryptStorage from '@/services/encrypt.storage'
import { atom } from 'jotai'

export const INITIAL_VALUE = {
  id: '',
  state: false,
  token: '',
  expire_in: '',
  user_id: '',
  createdAt: '',
  updatedAt: ''
}

const respuesta = encryptStorage.getItemStorage('auth', true)

let auth = INITIAL_VALUE
if (respuesta) {
  auth = JSON.parse(respuesta)
}

export const authAtom = atom(auth)

export const isLogin = atom(get => get(authAtom).state)
