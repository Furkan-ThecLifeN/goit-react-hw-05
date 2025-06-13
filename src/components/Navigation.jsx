import { NavLink } from 'react-router-dom';
import '../css/Navigation.css';

const Navigation = () => {
  return (
    <nav className="nav-container">
      <NavLink to="/" className="nav-link">
        Home
      </NavLink>
      <NavLink to="/movies" className="nav-link">
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
