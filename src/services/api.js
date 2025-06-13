import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

// DÜZELTİLDİ: Bearer ile birlikte kullanılıyor
const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZWJmOWU4MzdkOWVmNGZlZDZiZTAzY2RlZTAyMTZiNSIsIm5iZiI6MTc0MjkxNzcyNC4zOTYsInN1YiI6IjY3ZTJkMDVjZDcwYzYxNTkwMzc1ZTgzNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mGfFevHBMVfVG3Aha3atAbsBAX0sx3BUJdHGcEDZwAk';

const options = {
  headers: {
    Authorization: TOKEN,
  },
};

export const fetchTrending = async () => {
  const { data } = await axios.get(`${BASE_URL}/trending/movie/day`, options);
  return data.results;
};

export const searchMovies = async query => {
  const { data } = await axios.get(`${BASE_URL}/search/movie?query=${query}`, options);
  return data.results;
};

export const fetchMovieDetails = async id => {
  const { data } = await axios.get(`${BASE_URL}/movie/${id}`, options);
  return data;
};

export const fetchMovieCast = async id => {
  const { data } = await axios.get(`${BASE_URL}/movie/${id}/credits`, options);
  return data.cast;
};

export const fetchMovieReviews = async id => {
  const { data } = await axios.get(`${BASE_URL}/movie/${id}/reviews`, options);
  return data.results;
};
