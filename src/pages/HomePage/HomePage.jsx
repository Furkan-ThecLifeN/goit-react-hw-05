import React, { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchTrendingMovies()
      .then(setMovies)
      .catch(() => setError('Failed to fetch trending movies'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading trending movies...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <h1>Trending Movies Today</h1>
      <MovieList movies={movies} />
    </section>
  );
}
