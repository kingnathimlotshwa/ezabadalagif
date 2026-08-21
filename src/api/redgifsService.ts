import apiClient from './apiClient';
import type { RedGifResponse, RedGifCreatorResponse, RedGifAuthResponse } from '../types/redgifs';

export const redgifsService = {
  async authenticate(): Promise<void> {
    try {
      // Using the temporary token endpoint as specified
      const response = await apiClient.get<RedGifAuthResponse>('/v2/auth/temporary');
      const token = response.data.token;
      localStorage.setItem('redgifs_token', token);
    } catch (error) {
      console.error('Authentication failed:', error);
      throw error;
    }
  },

  async searchGifs(query: string, page = 1, count = 20): Promise<RedGifResponse> {
    const response = await apiClient.get<RedGifResponse>(`/v2/gifs/search`, {
      params: {
        type: 'g',
        tags: query,
        order: 'trending',
        count: count,
        page: page,
      },
    });
    return response.data;
  },

  async getTrendingGifs(page = 1, count = 20): Promise<RedGifResponse> {
    const response = await apiClient.get<RedGifResponse>(`/v2/gifs/search`, {
      params: {
        order: 'trending',
        count: count,
        page: page,
      },
    });
    return response.data;
  },

  async searchCreators(query: string): Promise<RedGifCreatorResponse> {
    const response = await apiClient.get<RedGifCreatorResponse>(`/v2/search/creators`, {
      params: {
        search: query,
      },
    });
    return response.data;
  },
};