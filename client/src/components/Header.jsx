import { Link, NavLink, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import logo from '../assets/logo.png';
import photo from '../assets/photo.jpg';
import { logout } from "../slices/index.js";

const Header = ({ isMainPage = false }) => {
  const { favorites } = useSelector((state) => state.favorites);
  const productsTrigger = () => {}
  const favoritesTrigger = () => {}
  const cartTrigger = () => {}

  return (
    <div className="main-container">
      { isMainPage ? <img src={photo} className="main"/> : null }
      <ul className="main-text">
        <li className="text-main">
          {/* <NavLink to="/" onClick={productsTrigger}> */}
            <img src={logo} className="logo"/>
          {/* </NavLink> */}
        </li>
        <li className="text-main">
            <Link onClick={productsTrigger} to="/">
              Каталог
            </Link>
        </li>
        <li className="text-main">
            <Link onClick={favoritesTrigger} to="/favorites">
              Избранное ({favorites.length})
            </Link>
        </li>
        <li className="text-main">
            <Link onClick={cartTrigger} to="/cart">
              Корзина
            </Link>
        </li>
        <li className="text-main">
            <Link to="/orders">
              Заказы
            </Link>
        </li>
        <li className="text-main">
            <Link to="/returns">
              Возвраты
            </Link>
        </li>
        <AuthorizationBlock/>
      </ul>
      { isMainPage ? <><h1>Maconi</h1><p className="store-description">Интернет магазин бытовой техники</p></> : null }
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
    <li className="text-main">
      <Link to="/login" className="auth-button">
        Вход
      </Link>
    </li>
    <li className="text-main">
      <Link to="/registration" className="auth-button">
        Регистрация
      </Link>
    </li>
    </> :
    <li className="text-main">
      <Link to="/registration" className="auth-button" onClick={handleLogout}>
        Выход
      </Link>
    </li>
  );
};

export default Header;
