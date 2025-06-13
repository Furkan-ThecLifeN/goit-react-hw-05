import { useEffect, useState } from 'react';
import { fetchTrending } from '../services/api';
import MovieList from '../components/MovieList';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrending().then(setMovies);
  }, []);

  return <MovieList movies={movies} />;
}
