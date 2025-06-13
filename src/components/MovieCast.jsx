import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../services/api';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCast(movieId).then(setCast);
  }, [movieId]);

  if (!cast.length) return <p>No cast info available.</p>;

  return (
    <ul>
      {cast.map(({ id, name, character }) => (
        <li key={id}>{name} as {character}</li>
      ))}
    </ul>
  );
}