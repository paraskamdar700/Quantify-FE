import axios from 'axios';
import { store } from '../../app/store.js';
import { logout } from '../../features/auth/slices/authSlice.js';

export const apiClient = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
  withCredentials: true, // CRITICAL: Sends cookies automatically with every request
});

// NOTE: Request Interceptor is DELETED. Browsers handle cookies automatically.

// Response Interceptor (For Refresh Logic)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loops
    if (originalRequest.url.includes('/auth/refresh-token') || originalRequest.url.includes('/auth/login')) {
       return Promise.reject(error);
    }

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 1. Call Refresh API
        // Backend reads refreshToken cookie -> Sets new accessToken cookie
        await apiClient.post('/auth/refresh-token');

        // 2. Retry Original Request
        // Browser will automatically attach the NEW accessToken cookie
        return apiClient(originalRequest);

      } catch (refreshError) {
        // If refresh fails, clear Redux/Local Storage and Redirect
        store.dispatch(logout());
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);