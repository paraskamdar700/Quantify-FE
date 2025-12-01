import axios from 'axios';
import { store } from '../../app/store'; // If you need store for logout logic later

export const apiClient = axios.create({
  baseURL: 'http://localhost:4000/api/v1', 
  // REMOVED: headers: { 'Content-Type': 'application/json' }
  // We trust Axios to set the correct header automatically based on the data we send.
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Add response interceptor for 401 errors if you haven't yet
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
       // Logic to logout user
       localStorage.removeItem('token');
       localStorage.removeItem('user');
       window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);