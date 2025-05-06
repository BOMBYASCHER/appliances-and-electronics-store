import { NavLink, Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import logo from '../assets/logo.png';
import { logout } from "../slices/index.js";
import { useGetFavoritesQuery, useLazyGetFavoritesQuery } from "../slices/api/favoritesApi.js";
import { useGetProductsQuery, useLazyGetProductsQuery } from "../slices/api/productsApi.js";
import { useGetCartQuery, useLazyGetCartQuery } from "../slices/api/cartApi.js";

const Header = () => {
  const { favorites } = useSelector((state) => state.favorites);
  const [productsTrigger] = useLazyGetProductsQuery();
  const [favoritesTrigger] = useLazyGetFavoritesQuery();
  const [cartTrigger] = useLazyGetCartQuery();
  useGetProductsQuery();
  useGetFavoritesQuery();
  useGetCartQuery();

  console.log('HEADER LOG ()')

  return (
    <div className='container bg-dark'>
      <header className='d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom'>
        <div className="col-md-3 mb-2 mb-md-0">
          <NavLink onClick={productsTrigger} to="/" className='nav-link px-2 link-secondary'>
            <img src={logo} height={70}></img>
          </NavLink>
        </div>
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <NavLink onClick={productsTrigger} to="/" className='nav-link px-2 link-secondary'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink onClick={favoritesTrigger} to="/favorites" className='nav-link px-2 link-secondary'>
              Favorites ({favorites.length})
            </NavLink>
          </li>
          <li>
            <NavLink onClick={cartTrigger} to="/cart" className='nav-link px-2 link-secondary'>
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" className='nav-link px-2 link-secondary'>
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/returns" className='nav-link px-2 link-secondary'>
              Returns
            </NavLink>
          </li>
        </ul>
        <div className="col-md-3 text-end">
          <AuthorizationBlock/>
        </div>
      </header>
    </div>
    
  );
};

const AuthorizationBlock = () => {
  const { accessToken, user } = useSelector((state) => state.authentication);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
    window.location.reload();
  };

  return (
    accessToken == null ?
    <>
    <Link to="/login">
    <button type="button" className="btn btn-outline-primary me-2">
      Login
    </button>
    </Link>
    <Link to="/registration">
      <button type="button" className="btn btn-primary">
        Sign-up
      </button>
    </Link>
    </> :
    <div className="d-flex flex-wrap justify-content-end gap-3">
      <div className="fs-5 align-self-center text-white bg-dark">{user}</div>
      <button type="button" className="btn btn-primary" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Header;
