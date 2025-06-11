import React, { useEffect, useState, useRef, Suspense, lazy } from 'react';
import { useParams, NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import { fetchMovieDetails, IMAGE_BASE_URL } from '../../services/api';
import styles from './MovieDetailsPage.module.css';

const MovieCast = lazy(() => import('../../components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../../components/MovieReviews/MovieReviews'));

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/movies');

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchMovieDetails(movieId)
      .then(setMovie)
      .catch(() => setError('Failed to load movie details'))
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) return <p>Loading movie details...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return null;

  return (
    <section className={styles.details}>
      <Link to={backLinkRef.current}>Go Back</Link>
      <h1>{movie.title}</h1>
      <img
        src={movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : ''}
        alt={movie.title}
        width={300}
      />
      <p>{movie.overview}</p>

      <nav className={styles.subNav}>
        <NavLink to="cast" state={{ from: backLinkRef.current }}>
          Cast
        </NavLink>
        <NavLink to="reviews" state={{ from: backLinkRef.current }}>
          Reviews
        </NavLink>
      </nav>

      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </section>
  );
}
