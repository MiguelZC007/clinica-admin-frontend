import CryptoJS from 'crypto-js'

class CryptoStorage {
  getItemStorage(key: string, encript = false): string {
    try {
      const cipherText = localStorage.getItem(key)
      if (encript && cipherText) {
        const bytes = CryptoJS.AES.decrypt(
          cipherText,
          import.meta.env.VITE_CRYPTO_KEY || ''
        )
        const originalText = bytes.toString(CryptoJS.enc.Utf8)
        return originalText
      } else return cipherText || ''
    } catch (e) {
      return ''
    }
  }

  setItemStorage(key: string, payload: any, encript = false) {
    try {
      if (encript) {
        const cipherText = CryptoJS.AES.encrypt(
          JSON.stringify(payload),
          import.meta.env.VITE_CRYPTO_KEY || ''
        ).toString()
        localStorage.setItem(key, cipherText)
      } else localStorage.setItem(key, JSON.stringify(payload))
    } catch (error) {
      console.error(error)
    }
  }

  removeItemStorage(key: string) {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(error)
    }
  }

  clearLocalStorage() {
    try {
      localStorage.clear()
    } catch (error) {
      console.error(error)
    }
  }
}
export const encryptStorage = new CryptoStorage()
export default encryptStorage
