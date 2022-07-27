import CryptoJS from 'crypto-js';

class CryptoStorage {
  getItemStorage(key: string, encript = false): JSON | null {
    try {
      const cipherText = localStorage.getItem(key);

      if (encript && cipherText) {
        const bytes = CryptoJS.AES.decrypt(
          cipherText,
          import.meta.env.REACT_APP_CRYPTO_KEY || ''
        );
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(originalText);
      } else return JSON.parse(cipherText || '') ?? '';
    } catch (e) {
      return null;
    }
  }

  setItemStorage(key: string, payload: JSON, encript = false) {
    try {
      if (encript) {
        const cipherText = CryptoJS.AES.encrypt(
          JSON.stringify(payload),
          import.meta.env.REACT_APP_CRYPTO_KEY || ''
        ).toString();
        localStorage.setItem(key, cipherText);
      } else localStorage.setItem(key, JSON.stringify(payload));
    } catch (error) {
      console.error(error);
    }
  }

  removeItemStorage(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  }

  clearLocalStorage() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error(error);
    }
  }
}
export const encryptStorage = new CryptoStorage();
export default encryptStorage;
