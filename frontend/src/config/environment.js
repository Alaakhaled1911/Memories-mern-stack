// Environment configuration
const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";

// API Base URL configuration
const getApiBaseUrl = () => {
  // In development, use localhost
  if (isDevelopment) {
    return "http://localhost:7000/api";
  }

  // In production, use the deployed Vercel URL
  if (isProduction) {
    return "https://memories-mern-stack-hvyh-qjhj7cp8x.vercel.app/api";
  }

  // Fallback
  return "http://localhost:7000/api";
};

export const API_BASE_URL = getApiBaseUrl();

export const API_ENDPOINTS = {
  POSTS: `${API_BASE_URL}/posts`,
  USERS: `${API_BASE_URL}/users`,
};

export default API_BASE_URL;
