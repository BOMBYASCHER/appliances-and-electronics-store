import { NavLink, Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import logo from '../assets/logo.png';
import { logout } from "../slices/index.js";

const Header = () => {
  const { favorites } = useSelector((state) => state.favorites);
  const productsTrigger = () => {}
  const favoritesTrigger = () => {}
  const cartTrigger = () => {}

  return (
    <div className='bg-dark'>
      <div className='container bg-dark'>
      <header className='d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3'>
        <div className="col-md-3 mb-2 mb-md-0">
          <NavLink onClick={productsTrigger} to="/" className='nav-link px-2 link-secondary link-light'>
            <img src={logo} height={70}></img>
          </NavLink>
        </div>
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <NavLink onClick={productsTrigger} to="/" className='nav-link px-2 link-secondary fs-5 link-light'>
              Каталог
            </NavLink>
          </li>
          <li>
            <NavLink onClick={favoritesTrigger} to="/favorites" className='nav-link px-2 link-secondary fs-5 link-light'>
              Избранное ({favorites.length})
            </NavLink>
          </li>
          <li>
            <NavLink onClick={cartTrigger} to="/cart" className='nav-link px-2 link-secondary fs-5 link-light'>
              Корзина
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" className='nav-link px-2 link-secondary fs-5 link-light'>
              Заказы
            </NavLink>
          </li>
          <li>
            <NavLink to="/returns" className='nav-link px-2 link-secondary fs-5 link-light'>
              Возвраты
            </NavLink>
          </li>
        </ul>
        <div className="col-md-3 text-end">
          <AuthorizationBlock/>
        </div>
      </header>
    </div>
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
      Вход
    </button>
    </Link>
    <Link to="/registration">
      <button type="button" className="btn btn-primary">
        Регистрация
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
