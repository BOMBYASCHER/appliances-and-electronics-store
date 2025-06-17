import { useEffect, useState } from "react";
import { useLoginMutation } from "../slices/api/authApi";
import { Link, useNavigate } from "react-router";
import { useLazyGetFavoritesQuery } from "../slices/api/favoritesApi";
import { useLazyGetCartQuery } from "../slices/api/cartApi";
import { useLazyGetProductsQuery } from "../slices/api/productsApi";

const Login = () => {
  const [login, { isSuccess, isError: isLoginError, isLoading }] = useLoginMutation();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

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
      productsTrigger();
      favoritesTrigger();
      cartTrigger();
      navigate('/', { replace: true });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isLoginError) {
      setIsError(true);
    }
  }, [isLoginError]);

  const handlePhone = ({ target: { value } }) => {
    setIsError(false);
    const preparedValue = value.trim();
    setPhone(preparedValue);
  };

  const handlePassword = ({ target: { value } }) => {
    setIsError(false);
    setPassword(value);
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <form className="d-grid gap-2 w-25" onSubmit={(e) => handleForm(e)}>
        <h1 className="h3 mb-3 fw-normal">Пожалуйста войдите</h1>
        <div className="form-floating">
          <input
            type="tel"
            className="form-control"
            id="floatingInput"
            placeholder="+22 607 123 4567"
            value={phone}
            onChange={(e) => handlePhone(e)}
          />
          <label htmlFor="floatingInput">Телефон</label>
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
          <label htmlFor="floatingPassword">Пароль</label>
        </div>
        {isError ?
        <div className='text-danger'>
          Пожалуйста, проверьте ваш телефон и пароль.
        </div> : null}
        <p className="mt-5 mb-3 text-body-secondary">
          У вас нет учетной записи? <Link to='/registration' className="text-reset">Зарегистрироваться!</Link>
        </p>
        <button className="btn btn-primary w-100 py-2" type="submit">
          {
            isLoading ?
            <>
              <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
              <span role="status">Загрузка...</span>
            </> :
            'войти в систему'
          }
        </button>
      </form>
    </div>
  );
};

export default Login;
