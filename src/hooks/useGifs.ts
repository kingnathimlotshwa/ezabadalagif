import { useState, useEffect, useCallback } from 'react';
import { redgifsService } from '../api/redgifsService';
import type { RedGif } from '../types/redgifs';

export function useGifs(initialQuery: string = '') {
  const [gifs, setGifs] = useState<RedGif[]>([]);
  const [loading, setLoading] = useState(true); // Start as true
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(initialQuery);
  const [authError, setAuthError] = useState<string | null>(null);

  const fetchGifs = useCallback(async (currentPage: number, currentQuery: string, append = false) => {
    setLoading(true);
    setError(null);
    try {
      const data = currentQuery
        ? await redgifsService.searchGifs(currentQuery, currentPage)
        : await redgifsService.getTrendingGifs(currentPage);

      setGifs(prev => append ? [...prev, ...data.gifs] : data.gifs);
    } catch (err) {
      setError('Failed to fetch GIFs. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    async function init() {
      try {
        // Ensure we are authenticated before the first fetch
        await redgifsService.authenticate();
        await fetchGifs(1, query, false);
      } catch (err) {
        setAuthError('Authentication failed. Please refresh the page.');
        setLoading(false);
        console.error('Auth init error:', err);
      }
    }
    init();
  }, [query, fetchGifs]);

  const loadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchGifs(nextPage, query, true);
  };

  return {
    gifs,
    loading,
    error,
    authError,
    query,
    setQuery,
    loadMore,
    page
  };
}
