import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // Adjust the baseURL to your backend URL
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN': Cookies.get('XSRF-TOKEN'), // Ensure CSRF token is included
    'Authorization': `Bearer ${Cookies.get('auth_token')}` // Include auth token if stored in cookies
  },
  withCredentials: true, // Send cookies with requests
});

export default axiosInstance;
