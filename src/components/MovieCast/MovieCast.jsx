import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast, IMAGE_BASE_URL } from '../../services/api';
import styles from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchMovieCast(movieId)
      .then(data => {
        setCast(data);
        setError(null);
      })
      .catch(() => setError('Failed to load cast'))
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) return <p>Loading cast...</p>;
  if (error) return <p>{error}</p>;
  if (!cast.length) return <p>No cast information available.</p>;

  return (
    <ul className={styles.castList}>
      {cast.map(member => (
        <li key={member.cast_id}>
          <img
            src={member.profile_path ? IMAGE_BASE_URL + member.profile_path : ''}
            alt={member.name}
            width={100}
          />
          <p>{member.name}</p>
          <p>as {member.character}</p>
        </li>
      ))}
    </ul>
  );
}
