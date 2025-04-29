import { NavLink } from "react-router";
import logo from '../assets/logo.png';
import { useSelector } from "react-redux";

const Header = () => {
  const { favorites } = useSelector((state) => state.favorites);
  // const classname = "d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom";
  return (
    <div className='container bg-dark'>
      <header className='d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom'>
        <div className="col-md-3 mb-2 mb-md-0">
          <NavLink to="/" className='nav-link px-2 link-secondary'>
            <img src={logo} height={70}></img>
          </NavLink>
        </div>
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <NavLink to="/" className='nav-link px-2 link-secondary'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/favorites" className='nav-link px-2 link-secondary'>
              Favorites ({favorites.length})
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className='nav-link px-2 link-secondary'>
              Cart
            </NavLink>
          </li>
        </ul>
        <div className="col-md-3 text-end">
          <button type="button" className="btn btn-outline-primary me-2">Login</button>
          <button type="button" className="btn btn-primary">Sign-up</button>
        </div>
      </header>
    </div>
    
  )
}

export default Header;
