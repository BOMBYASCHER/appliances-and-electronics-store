import { NavLink } from "react-router";

const Header = () => {
  const classname = "d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom";
  return (
    <header className={classname}>
      <NavLink to="/">
        Home
      </NavLink>
      <NavLink to="/favorites">
        Favorites
      </NavLink>
      <NavLink to="/cart">
        Cart
      </NavLink>
    </header>
  )
}

export default Header;
// <NavLink
// to="/"
// className={({ isActive }) =>
//   isActive ? "active" : ""
// }
// >
// Home
// </NavLink>