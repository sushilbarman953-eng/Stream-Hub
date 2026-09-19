import { JIKAN_BASE_URL } from '../constants/endpoints';
import { TMDB_BASE_URL, TMDB_API_KEY } from '../constants/endpoints';

export const getTopAnime = async () => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    // Primary: Jikan Anime Engine
    const response = await fetch(`${JIKAN_BASE_URL}/top/anime?limit=20`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    if (!response.ok) throw new Error('Jikan Rate Limited or Down');
    const json = await response.json();
    return { source: 'jikan', data: json.data };
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn('Jikan failed, engaging TMDb Anime fallback...', err.message);

    // Fallback: TMDb Animation Genre (16) with Japanese Audio
    const fallbackRes = await fetch(
      `${TMDB_BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&with_genres=16&with_original_language=ja&sort_by=popularity.desc`
    );
    const fallbackJson = await fallbackRes.json();
    return { source: 'tmdb', data: fallbackJson.results };
  }
};
