import axios from 'axios';

const API_KEY = '9ebf9e837d9ef4fed6be03cdee0216b5'; 
const BASE_URL = 'https://api.themoviedb.org/3';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: API_KEY,
    'Content-Type': 'application/json',
  },
});

export const fetchTrendingMovies = () =>
  axiosInstance.get('/trending/movie/day').then(res => res.data.results);

export const fetchMoviesByQuery = query =>
  axiosInstance
    .get('/search/movie', { params: { query, include_adult: false, language: 'en-US', page: 1 } })
    .then(res => res.data.results);

export const fetchMovieDetails = movieId =>
  axiosInstance.get(`/movie/${movieId}`).then(res => res.data);

export const fetchMovieCast = movieId =>
  axiosInstance.get(`/movie/${movieId}/credits`).then(res => res.data.cast);

export const fetchMovieReviews = movieId =>
  axiosInstance.get(`/movie/${movieId}/reviews`).then(res => res.data.results);

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
