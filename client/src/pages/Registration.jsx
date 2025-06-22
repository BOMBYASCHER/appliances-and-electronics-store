import { useEffect, useState } from "react";
import { useRegistrationMutation } from "../slices/api/authApi";
import { useNavigate } from "react-router";
import { useLazyGetFavoritesQuery } from "../slices/api/favoritesApi";
import { useLazyGetCartQuery } from "../slices/api/cartApi";
import { useLazyGetProductsQuery } from "../slices/api/productsApi";
import style from '../assets/style/Registration.css?inline';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Registration = () => {
  const [registration, { isSuccess, isError, error, isLoading }] = useRegistrationMutation();
  const [phone, setPhone] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [isValidLastName, setIsValidLastName] = useState(null);
  const [isValidFirstName, setIsValidFirstName] = useState(null);
  const [isValidMiddleName, setIsValidMiddleName] = useState(true);
  const [isValidPhone, setIsValidPhone] = useState(null);
  const [isValidPassword, setIsValidPassword] = useState(null);
  const [isValidRepeatPassword, setIsValidRepeatPassword] = useState(null);

  const [isDisabled, setIsDisabled] = useState(true);

  const [phoneError, setPhoneError] = useState('Укажите корректный номер телефона (допустимые форматы: +1234567890, (123) 456-7890).');

  const navigate = useNavigate();
  const [productsTrigger] = useLazyGetProductsQuery();
  const [favoritesTrigger] = useLazyGetFavoritesQuery();
  const [cartTrigger] = useLazyGetCartQuery();

  const nameRegexp = new RegExp(/^(\p{L}+[-]{0,1}\p{L}+)$/, 'u');

  const lastNameInput = {
    isValid: isValidLastName == null ? false : isValidLastName,
    isInvalid: isValidLastName == null ? false : !isValidLastName,
  };
  const firstNameInput = {
    isValid: isValidFirstName == null ? false : isValidFirstName,
    isInvalid: isValidFirstName == null ? false : !isValidFirstName,
  };
  const middleNameInput = {
    isValid: isValidMiddleName == null ? false : isValidMiddleName,
    isInvalid: isValidMiddleName == null ? false : !isValidMiddleName,
  };
  const phoneInput = {
    isValid: isValidPhone == null ? false : isValidPhone,
    isInvalid: isValidPhone == null ? false : !isValidPhone,
  };
  const passwordInput = {
    isValid: isValidPassword == null ? false : isValidPassword,
    isInvalid: isValidPassword == null ? false : !isValidPassword,
  };
  const repeatPasswordInput = {
    isValid: isValidRepeatPassword == null ? false : isValidRepeatPassword,
    isInvalid: isValidRepeatPassword == null ? false : !isValidRepeatPassword,
  };

  const handleForm = (e) => {
    e.preventDefault();
    const fullName = middleName.trim().length == 0 ?
    `${lastName.trim()} ${firstName.trim()}` :
    `${lastName.trim()} ${firstName.trim()} ${middleName.trim()}`;
    registration({ phone: phone.trim(), fullName, password: password.trim() });
  };

  useEffect(() => {
    if (isSuccess) {
      productsTrigger();
      favoritesTrigger();
      cartTrigger();
      navigate('/', { replace: true });
      window.location.reload();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (error.originalStatus == 409) {
        setIsValidPhone(false);
        setPhoneError('Этот номер телефона уже используется.');
      }
    }
  }, [isError]);

  useEffect(() => {
    if (isValidFirstName && isValidLastName && isValidMiddleName && isValidPhone && isValidPassword && isValidRepeatPassword) {
      setIsDisabled(false);
    }
  }, [isValidFirstName, isValidLastName, isValidMiddleName, isValidPhone, isValidPassword, isValidRepeatPassword]);

  const handleLastName = ({ target: { value } }) => {
    const preparedValue = value.trim();
    setLastName(preparedValue);
    const isValid = nameRegexp.test(preparedValue);
    if (isValid) {
      setIsValidLastName(true);
    } else {
      setIsValidLastName(false);
    }
  };

  const handleFirstName = ({ target: { value } }) => {
    const preparedValue = value.trim();
    setFirstName(preparedValue);
    const isValid = nameRegexp.test(preparedValue);
    if (isValid) {
      setIsValidFirstName(true);
    } else {
      setIsValidFirstName(false);
    }
  };

  const handleMiddleName = ({ target: { value } }) => {
    const preparedValue = value.trim();
    setMiddleName(preparedValue);
    if (preparedValue.length == 0) {
      setIsValidMiddleName(true);
    } else {
      const isValid = nameRegexp.test(preparedValue);
      if (isValid) {
        setIsValidMiddleName(true);
      } else {
        setIsValidMiddleName(false);
      }
    }
    
  };

  const handlePhone = ({ target: { value } }) => {
    const preparedValue = value.trim();
    setPhone(preparedValue);
    const regexp = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    const isValid = regexp.test(preparedValue);
    if (isValid) {
      setIsValidPhone(true);
    } else {
      setPhoneError('Укажите корректный номер телефона (допустимые форматы: +1234567890, (123) 456-7890).');
      setIsValidPhone(false);
    }
  };

  const handlePassword = ({ target: { value } }) => {
    const preparedValue = value.trim();
    setPassword(preparedValue);
    
    const isValid = /^[a-zA-Z0-9+)_(\-*]{6,}$/.test(preparedValue);
    if (isValid) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
  };

  const handleRepeatPassword = ({ target: { value } }) => {
    const preparedValue = value.trim();
    setRepeatPassword(preparedValue);
    const isValid = password === preparedValue;
    if (isValid) {
      setIsValidRepeatPassword(true);
    } else {
      setIsValidRepeatPassword(false);
    }
  };

  return (
    <>
    <style type='text/css'>{style}</style>
    <Header/>
    <div className='registration-form'>
    <h2>Регистрация</h2>
      <form id="regForm" onSubmit={(e) => handleForm(e)}>
        <div className="form-group">
          <label htmlFor="floatingLastNameInput">Фамилия</label>
          <input
            required={true}
            type="text"
            id="floatingLastNameInput"
            placeholder="Иванов"
            value={lastName}
            onChange={(e) => handleLastName(e)}
          />
          <div className="error" id="password-error">
            {
              lastNameInput.isInvalid ?
              "Фамилия должна содержать только буквы и может включать специальные символы (- , ')." :
              null
            }
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="floatingFirstNameInput">Имя</label>
          <input
            required={true}
            type="text"
            id="floatingFirstNameInput"
            placeholder="Иван"
            value={firstName}
            onChange={(e) => handleFirstName(e)}
          />
          <div className="error" id="password-error">
            {
              firstNameInput.isInvalid ?
              "Имя должно содержать только буквы и может включать специальные символы (- , ')." :
              null
            }
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="floatingMiddleNameInput">Отчество (необязательно)</label>
          <input
            type="text"
            id="floatingMiddleNameInput"
            placeholder="Иванович"
            value={middleName}
            onChange={(e) => handleMiddleName(e)}
          />
          <div className="error" id="password-error">
            {
              middleNameInput.isInvalid ?
              "Отчество должно содержать только буквы и может включать специальные символы (- , ')." :
              null
            }
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="floatingPhoneInput">Номер телефона</label>
          <input
            required={true}
            type="tel"
            id="floatingPhoneInput"
            placeholder="+78128128112"
            value={phone}
            onChange={(e) => handlePhone(e)}
          />
          <div className="error" id="phone-error">
            {
              phoneInput.isInvalid ?
              phoneError :
              null
            }
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="floatingPassword">Пароль</label>
          <input
            required={true}
            type="password"
            id="floatingPassword"
            placeholder="Пароль"
            value={password}
            onChange={(e) => handlePassword(e)}
            minLength={6}
          />
          <div className="error" id="password-error">
            {
              passwordInput.isInvalid ?
              'Пароль должен содержать минимум 6 символов и состоять только из букв, цифр и специальных символов: + _ - * ) (' :
              null
            }
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Повторите пароль</label>
          <input
            required={true}
            type="password"
            id="confirm-password"
            placeholder="Повторите пароль"
            value={repeatPassword}
            onChange={(e) => handleRepeatPassword(e)}
          />
          <div className="error" id="repeat-password-error">
            {
              repeatPasswordInput.isInvalid ?
              'Пароли должны совпадать' :
              null
            }
          </div>
        </div>
        <div className="form-group">
          {
            isLoading ?
            <input disabled={isDisabled} type="submit" value="Регистрация..."/> :
            <input disabled={isDisabled} type="submit" value="Зарегистрироваться"/>
          }
        </div>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default Registration;
