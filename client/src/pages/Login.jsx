import { useEffect, useState } from "react";
import { useLoginMutation } from "../slices/api/authApi";
import { Link, redirect, useNavigate } from "react-router";
import { useLazyGetFavoritesQuery } from "../slices/api/favoritesApi";
import { useLazyGetCartQuery } from "../slices/api/cartApi";
import { useLazyGetProductsQuery } from "../slices/api/productsApi";

const Login = () => {
  const [login, { isSuccess }] = useLoginMutation();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const [productsTrigger] = useLazyGetProductsQuery();
  const [favoritesTrigger] = useLazyGetFavoritesQuery();
  const [cartTrigger] = useLazyGetCartQuery();
 
  const handleForm = (e) => {
    e.preventDefault();
    login({ phone, password });
  };

  useEffect(() => {
    if (isSuccess) {
      // productsTrigger();
      // favoritesTrigger();
      // cartTrigger();
      // navigate('/', { replace: true });
      location.href = '/'
    }
  }, [isSuccess]);

  const handlePhone = ({ target: { value } }) => {
    setPhone(value);
  };

  const handlePassword = ({ target: { value } }) => {
    setPassword(value);
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <form className="d-grid gap-2 w-25" onSubmit={(e) => handleForm(e)}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <div className="form-floating">
          <input
            type="tel"
            className="form-control"
            id="floatingInput"
            placeholder="+22 607 123 4567"
            value={phone}
            onChange={(e) => handlePhone(e)}
          />
          <label for="floatingInput">Phone</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="password"
            value={password}
            onChange={(e) => handlePassword(e)}
          />
          <label for="floatingPassword">Password</label>
        </div>
        <p class="mt-5 mb-3 text-body-secondary">
          Don't have an account? <Link to='/registration' className="text-reset">Sign-up!</Link>
        </p>
        <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default Login;
