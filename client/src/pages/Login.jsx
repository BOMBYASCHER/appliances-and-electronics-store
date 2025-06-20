import { useEffect, useState } from "react";
import { useLoginMutation } from "../slices/api/authApi";
import { Link, useNavigate } from "react-router";
import { useLazyGetFavoritesQuery } from "../slices/api/favoritesApi";
import { useLazyGetCartQuery } from "../slices/api/cartApi";
import { useLazyGetProductsQuery } from "../slices/api/productsApi";
import Footer from "../components/Footer";
import style from '../assets/style/Login.css?inline';

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
    <>
    <style type='text/css'>{style}</style>
    <div className="container">
      <h2>Вход в аккаунт</h2>
      <form id="loginForm" onSubmit={(e) => handleForm(e)}>
        <div class="form-group">
          <label htmlFor="phone"><i class="fas fa-phone icon"></i> Номер телефона</label>
          <input type="tel" value={phone} onChange={(e) => handlePhone(e)} id="phone" name="phone" required placeholder="Введите номер телефона"/>
        </div>
        <div class="form-group">
          <label htmlFor="password"><i class="fas fa-lock icon"></i> Пароль</label>
          <input onChange={(e) => handlePassword(e)} value={password} type="password" id="password" name="password" required placeholder="Введите пароль"/>
        </div>
        <div className="form-group">
          {
            isLoading ?
            <input type="submit" value="Вход..."/> :
            <input type="submit" value="Войти"/>
          }
        </div>
        {isError ?
        <div className='text-danger'>
          Пожалуйста, проверьте ваш телефон и пароль.
        </div> : null}
        <div className="footer">
          Нет учетной записи? <Link to='/registration'>Зарегистрироваться!</Link>
        </div>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default Login;
