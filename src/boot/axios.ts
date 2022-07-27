import Axios from 'axios';
import CryptoStorage from '../services/encrypt.storage';

const authHeader = () => {
  const session = JSON.parse(localStorage.getItem('auth') || '');
  if (session?.loggedIn) return `Bearer ${session.token.access_token}`;
  return '';
};

const axios = Axios.create({
  baseURL: import.meta.env.REACT_APP_API,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json'
  }
});

axios.interceptors.request.use(
  config => {
    if (authHeader()) {
      config.headers!['Authorization'] = authHeader();
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  config => {
    return config;
  },
  error => {
    if (error.response?.data?.message === 'Unauthorized') {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axios;
