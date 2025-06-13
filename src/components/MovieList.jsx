import { Link, useLocation } from 'react-router-dom';
import "../css/MovieList.css"

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className="movie-list">
      {movies.map(movie => (
        <li key={movie.id} className="movie-card">
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
            )}
            <h3>{movie.title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
