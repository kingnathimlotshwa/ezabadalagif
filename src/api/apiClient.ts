import axios from 'axios';

const API_DOMAIN = 'https://api.redgifs.com';
const PROXY_URL = 'https://api.allorigins.win/raw?url=';

const apiClient = axios.create({
  headers: {
    'Accept': 'application/json',
  },
});

// Interceptor to handle CORS proxy and Auth token
apiClient.interceptors.request.use((config) => {
  // 1. Apply CORS Proxy to the URL
  if (config.url && !config.url.startsWith('http')) {
    config.url = `${PROXY_URL}${API_DOMAIN}${config.url}`;
  } else if (config.url && !config.url.startsWith(PROXY_URL)) {
    // Handle cases where full URL might be passed
    const targetUrl = config.url.startsWith(API_DOMAIN)
      ? config.url
      : `${API_DOMAIN}${config.url}`;
    config.url = `${PROXY_URL}${targetUrl}`;
  }

  // 2. Add the token to requests
  const token = localStorage.getItem('redgifs_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

export default apiClient;