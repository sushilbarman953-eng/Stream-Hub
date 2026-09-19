import { TMDB_IMAGE_BASE } from '../constants/endpoints';

export const normalizeMediaItem = (item, type = 'movie') => {
  if (!item) return null;

  // Normalization for TMDb items
  if (item.poster_path !== undefined || item.backdrop_path !== undefined) {
    return {
      id: item.id,
      mediaType: type || (item.title ? 'movie' : 'tv'),
      title: item.title || item.name || 'Untitled',
      overview: item.overview || '',
      posterUrl: item.poster_path ? `${TMDB_IMAGE_BASE}/w500${item.poster_path}` : null,
      backdropUrl: item.backdrop_path ? `${TMDB_IMAGE_BASE}/original${item.backdrop_path}` : null,
      rating: item.vote_average ? item.vote_average.toFixed(1) : 'N/A',
      releaseDate: item.release_date || item.first_air_date || '',
      language: item.original_language || 'en',
    };
  }

  // Normalization for Jikan (Anime) items
  if (item.mal_id !== undefined) {
    return {
      id: `anime_${item.mal_id}`,
      mediaType: 'anime',
      title: item.title_english || item.title || 'Untitled Anime',
      overview: item.synopsis || '',
      posterUrl: item.images?.jpg?.large_image_url || item.images?.jpg?.image_url || null,
      backdropUrl: item.images?.jpg?.large_image_url || null,
      rating: item.score ? item.score.toString() : 'N/A',
      releaseDate: item.aired?.from ? item.aired.from.split('T')[0] : '',
      language: 'ja',
    };
  }

  return item;
};
