import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchMoviesByQuery } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [input, setInput] = useState(query);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    fetchMoviesByQuery(query)
      .then(results => {
        setMovies(results);
        setError(null);
      })
      .catch(() => setError('Search failed'))
      .finally(() => setLoading(false));
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    if (input.trim() === '') return;
    setSearchParams({ query: input.trim() });
  };

  return (
    <section>
      <h1>Search Movies</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Search movies..."
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </section>
  );
}
