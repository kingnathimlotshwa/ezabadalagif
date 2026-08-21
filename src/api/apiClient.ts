import axios from 'axios';

const API_DOMAIN = 'https://api.redgifs.com';
// Use a more stable proxy for production
const PROXY_URL = 'https://api.allorigins.win/get?url=';

const apiClient = axios.create({
  headers: {
    'Accept': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  if (isLocalhost) {
    // Use Vite proxy for local development
    if (config.url && !config.url.startsWith('http')) {
      config.url = `/api${config.url}`;
    }
  } else {
    // Use CORS proxy for production (GitHub Pages)
    if (config.url && !config.url.startsWith('http')) {
      const targetUrl = `${API_DOMAIN}${config.url}`;
      config.url = `${PROXY_URL}${encodeURIComponent(targetUrl)}`;
    } else if (config.url && !config.url.startsWith(PROXY_URL)) {
      const targetUrl = config.url.startsWith(API_DOMAIN)
        ? config.url
        : `${API_DOMAIN}${config.url}`;
      config.url = `${PROXY_URL}${encodeURIComponent(targetUrl)}`;
    }
  }

  const token = localStorage.getItem('redgifs_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

// Since allorigins /get returns a JSON wrapper { contents: "...", status: { ... } }
// we need to unwrap the response.
apiClient.interceptors.response.use((response) => {
  if (response.data && typeof response.data === 'object' && 'contents' in response.data) {
    try {
      // The contents are returned as a string, we need to parse them back to JSON
      const parsedContents = JSON.parse(response.data.contents);
      return {
        ...response,
        data: parsedContents,
      };
    } catch (e) {
      console.error('Failed to parse proxy contents:', e);
    }
  }
  return response;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;