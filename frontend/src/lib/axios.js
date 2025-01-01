import axios from 'axios'
import { useUserStore } from '../stores/useUserStore'

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:5000/api',
    baseURL: '/api',

    withCredentials: true

})

let refreshPromise = null;

// Add Axios Response Interceptor for Token Refresh
axiosInstance.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried

      try {
        // Prevent simultaneous refresh token requests
        if (!refreshPromise) {
          refreshPromise = useUserStore.getState().refreshToken();
        }

        await refreshPromise;
        refreshPromise = null;

        // Retry the original request with the new token
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        refreshPromise = null;
        useUserStore.getState().logout(); // Logout user on failed refresh
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // Pass through other errors
  }
);


export default axiosInstance