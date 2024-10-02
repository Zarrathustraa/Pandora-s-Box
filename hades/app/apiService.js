// src/apiService.js
import axios from 'axios';
import { baseUrl } from './backendconfig';

// Create an axios instance with the base URL and default configuration
const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000, // Set timeout to 10 seconds
});

// Signup function (updated to include role)
export const signup = async (name, email, password, role) => {
  try {
    const response = await axiosInstance.post('/auth/signup', { name, email, password, role });
    return response.data; // This will contain the access_token and other data if needed
  } catch (error) {
    if (error.response) {
      // Server response received with an error status code
      switch (error.response.status) {
        case 400:
          throw new Error("Invalid registration details. Please check your inputs");
        case 409:
          throw new Error("Email already exists");
        case 500:
          throw new Error("Server error. Please try again later");
        default:
          throw new Error(error.response.data.message || "Signup failed");
      }
    } else {
      throw new Error("Network error or server not reachable");
    }
  }
};

// Login function
export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post('/auth/login', { email, password });
    return response.data; // This contains the access_token and other data if needed
  } catch (error) {
    if (error.response) {
      // Server response received with an error status code
      switch (error.response.status) {
        case 400:
          throw new Error("Invalid email or password");
        case 401:
          throw new Error("Unauthorized. Please check your credentials");
        case 500:
          throw new Error("Server error. Please try again later");
        default:
          throw new Error(error.response.data.message || "Login failed");
      }
    } else {
      throw new Error("Network error or server not reachable");
    }
  }
};

// Logout function
export const logout = async (token) => {
  try {
    const response = await axiosInstance.post(
      '/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // This will contain the logout success message
  } catch (error) {
    if (error.response) {
      // Server response received with an error status code
      switch (error.response.status) {
        case 401:
          throw new Error("Unauthorized. Please try to log in again");
        case 500:
          throw new Error("Server error during logout. Please try again");
        default:
          throw new Error(error.response.data.message || "Logout failed");
      }
    } else {
      throw new Error("Network error or server not reachable");
    }
  }
};
