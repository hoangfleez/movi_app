export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const API_KEY = "a6311f0a80a80559e06536fed237a307";
const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
const tmdbEndpointSearch = "https://api.themoviedb.org/3/search/movie";
export const API = {
  getUpComing: (type) => `${tmdbEndpoint}/${type}?api_key=${API_KEY}`,

  getMovieList: (type, page = 1) =>
    `${tmdbEndpoint}/${type}?api_key=${API_KEY}&page=${page}`,
  getMovieDetails: (movieId) => `${tmdbEndpoint}/${movieId}?api_key=${API_KEY}`,
  getMovieMeta: (movieId, type) =>
    `${tmdbEndpoint}/${movieId}/${type}?api_key=${API_KEY}`,
  getMovieSearch: (query, page) =>
    `${tmdbEndpointSearch}?api_key=${API_KEY}&query=${query}&page=${page}`,
};
