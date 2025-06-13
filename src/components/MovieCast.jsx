import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieCast } from '../services/api';
import '../css/MovieCast.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCast(movieId).then(setCast).catch(console.error);
  }, [movieId]);

  if (!cast.length) return <p className="info-text">Oyuncu bilgisi bulunamadı.</p>;

  return (
    <ul className="cast-container">
      {cast.map(({ cast_id, name, character, profile_path }) => (
        <li key={cast_id} className="cast-card">
          <img
            src={
              profile_path
                ? `https://image.tmdb.org/t/p/w200${profile_path}`
                : 'https://via.placeholder.com/200x300?text=No+Image'
            }
            alt={name}
          />
          <h3>{name}</h3>
          <p>as {character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
