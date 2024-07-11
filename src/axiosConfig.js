import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', 
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config) => {
  const token = Cookies.get('XSRF-TOKEN');
  if (!token) {
    await axios.get('http://localhost:8000/csrf-token');
  }
  config.headers['X-XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN');
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
