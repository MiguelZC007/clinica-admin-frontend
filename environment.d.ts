export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_API: 'http://158.101.9.239:3005/v1/';
      REACT_APP_CRYPTO_KEY: 'making-it-easy-to-encrypt-and-decrypt-data-in-react-app';
      ENV: 'test' | 'dev' | 'prod';
    }
  }
}
