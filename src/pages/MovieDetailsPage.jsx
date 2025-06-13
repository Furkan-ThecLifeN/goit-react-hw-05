import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../services/api';
import "../css/MovieDetailsPage.css";
import "../css/MovieCast.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLink = location.state?.from || '/movies';

  useEffect(() => {
    fetchMovieDetails(movieId).then(setMovie).catch(console.error);
  }, [movieId]);

  if (!movie) return <p>Loading movie...</p>;

  return (
    <div className="details-container">
      <Link to={backLink} className="back-link">← Go back</Link>
      
      <div className="movie-card">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-info">
          <h2>{movie.title}</h2>
          <p><strong>Overview:</strong> {movie.overview}</p>
          <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}</p>
        </div>
      </div>

      <nav className="movie-details-nav">
        <NavLink
          to="cast"
          className={({ isActive }) => isActive ? 'active-link' : ''}
          state={{ from: backLink }}
        >
          Cast
        </NavLink>
        <NavLink
          to="reviews"
          className={({ isActive }) => isActive ? 'active-link' : ''}
          state={{ from: backLink }}
        >
          Reviews
        </NavLink>
      </nav>

      <Outlet />
    </div>
  );
}
