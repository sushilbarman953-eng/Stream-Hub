import { TMDB_BASE_URL, TMDB_API_KEY } from '../constants/endpoints';

const fetchWithTimeout = async (url, timeoutMs = 8000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    return await res.json();
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
};

export const getTrending = async (type = 'all', timeWindow = 'week') => {
  const url = `${TMDB_BASE_URL}/trending/${type}/${timeWindow}?api_key=${TMDB_API_KEY}&region=IN`;
  return fetchWithTimeout(url);
};

export const getRegionalMedia = async (type = 'movie', lang = 'hi') => {
  const url = `${TMDB_BASE_URL}/discover/${type}?api_key=${TMDB_API_KEY}&region=IN&watch_region=IN&with_original_language=${lang}&sort_by=popularity.desc`;
  return fetchWithTimeout(url);
};
