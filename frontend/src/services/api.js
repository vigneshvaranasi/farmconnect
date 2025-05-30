import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  // Register customer
  registerCustomer: async (userData) => {
    const response = await api.post('/auth/register/customer', userData);
    return response.data;
  },

  // Register trader
  registerTrader: async (userData) => {
    const response = await api.post('/auth/register/trader', userData);
    return response.data;
  },
  // Login
  login: async (credentials) => {
    console.log('API: Sending login request with:', credentials);
    const response = await api.post('/auth/login', credentials);
    console.log('API: Login response received:', response.data);
    return response.data;
  },

  // Get profile
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

// Farmer API functions
export const farmerAPI = {
  // Request farmer credentials
  requestCredentials: async (farmerData) => {
    const response = await api.post('/farmer/request-credentials', farmerData);
    return response.data;
  },

  // Check request status
  checkStatus: async (phoneNumber) => {
    const response = await api.get(`/farmer/check-status/${phoneNumber}`);
    return response.data;
  },

  // Get all farmer requests (admin)
  getFarmerRequests: async (status = '') => {
    const response = await api.get(`/farmer/requests${status ? `?status=${status}` : ''}`);
    return response.data;
  },

  // Approve farmer (admin)
  approveCredentials: async (farmerId, approvalData) => {
    const response = await api.post(`/farmer/approve/${farmerId}`, approvalData);
    return response.data;
  },

  // Reject farmer (admin)
  rejectCredentials: async (farmerId, rejectionData) => {
    const response = await api.post(`/farmer/reject/${farmerId}`, rejectionData);
    return response.data;
  },
};

export default api;
