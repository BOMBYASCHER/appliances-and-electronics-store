import cn from 'classnames';
import { useEffect, useState } from "react";
import { useRegistrationMutation } from "../slices/api/authApi";
import { useNavigate } from "react-router";
import { useLazyGetFavoritesQuery } from "../slices/api/favoritesApi";
import { useLazyGetCartQuery } from "../slices/api/cartApi";
import { useLazyGetProductsQuery } from "../slices/api/productsApi";
import { Link } from 'react-router';

const Registration = () => {
  const [registration, { isSuccess, isError, error }] = useRegistrationMutation();
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

  const [phoneError, setPhoneError] = useState('Phone number must be valid (e.g., +1234567890, (123) 456-7890).');

  const navigate = useNavigate();
  const [productsTrigger] = useLazyGetProductsQuery();
  const [favoritesTrigger] = useLazyGetFavoritesQuery();
  const [cartTrigger] = useLazyGetCartQuery();

  const nameRegexp = new RegExp(/^(\p{L}+[-]{0,1}\p{L}+)$/, 'u');

  const lastNameInput = cn('form-control', {
    'is-valid': isValidLastName == null ? false : isValidLastName,
    'is-invalid': isValidLastName == null ? false : !isValidLastName,
  });
  const firstNameInput = cn('form-control', {
    'is-valid': isValidFirstName == null ? false : isValidFirstName,
    'is-invalid': isValidFirstName == null ? false : !isValidFirstName,
  });
  const middleNameInput = cn('form-control', {
    'is-valid': isValidMiddleName == null ? false : isValidMiddleName,
    'is-invalid': isValidMiddleName == null ? false : !isValidMiddleName,
  });
  const phoneInput = cn('form-control', {
    'is-valid': isValidPhone == null ? false : isValidPhone,
    'is-invalid': isValidPhone == null ? false : !isValidPhone,
  });
  const passwordInput = cn('form-control', {
    'is-valid': isValidPassword == null ? false : isValidPassword,
    'is-invalid': isValidPassword == null ? false : !isValidPassword,
  });
  const repeatPasswordInput = cn('form-control', {
    'is-valid': isValidRepeatPassword == null ? false : isValidRepeatPassword,
    'is-invalid': isValidRepeatPassword == null ? false : !isValidRepeatPassword,
  });
 
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
        setPhoneError('This phone already in use.');
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
      setPhoneError('Phone number must be valid (e.g., +1234567890, (123) 456-7890).');
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
    <div className='container py-5'>
    <div className="d-flex align-items-center justify-content-center vh-100">
      <form className='d-grid gap-2 w-25' onSubmit={(e) => handleForm(e)}>
        <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
        <div className="form-floating form-group required">
          <input
            required={true}
            type="text"
            className={lastNameInput}
            id="floatingLastNameInput"
            placeholder="Smith"
            value={lastName}
            onChange={(e) => handleLastName(e)}
          />
          <label className='opacity-75' for="floatingInput">Last name</label>
          <div class="invalid-feedback">
            Last name must be include only letters and possible to have special characters (- , ').
          </div>
        </div>
        <div className="form-floating">
          <input
            required={true}
            type="text"
            className={firstNameInput}
            id="floatingFirstNameInput"
            placeholder="Smith"
            value={firstName}
            onChange={(e) => handleFirstName(e)}
          />
          <label className='opacity-75' for="floatingInput">First name</label>
          <div class="invalid-feedback">
            First name must be include only letters and possible to have special characters (- , ').
          </div>
        </div>
        <div className="form-floating">
          <input
            type="text"
            className={middleNameInput}
            id="floatingMiddleNameInput"
            placeholder="Smith"
            value={middleName}
            onChange={(e) => handleMiddleName(e)}
          />
          <label className='opacity-50' for="floatingInput">Middle name (optional)</label>
          <div class="invalid-feedback">
            Middle name must be include only letters and possible to have special characters (- , ').
          </div>
        </div>
        <div className="form-floating">
          <input
            required={true}
            type="tel"
            className={phoneInput}
            id="floatingPhoneInput"
            placeholder="+22 607 123 4567"
            value={phone}
            onChange={(e) => handlePhone(e)}
          />
          <label className='opacity-75' for="floatingInput">Phone</label>
          <div class="invalid-feedback">
            {phoneError}
          </div>
        </div>
        <div className="form-floating">
          <input
            required={true}
            type="password"
            className={passwordInput}
            id="floatingPassword"
            placeholder="password"
            value={password}
            onChange={(e) => handlePassword(e)}
            minLength={6}
          />
          <label className='opacity-75' for="floatingPassword">Password</label>
          <div class="invalid-feedback">
            Password must be at least 6 characters and include only letters, digits and special characters: + _ - * ) (
          </div>
        </div>
        <div className="form-floating">
          <input
            required={true}
            type="password"
            className={repeatPasswordInput}
            id="floatingRepeatPassword"
            placeholder="repeat password"
            value={repeatPassword}
            onChange={(e) => handleRepeatPassword(e)}
          />
          <label className='opacity-75' for="floatingPassword">Repeat password</label>
          <div class="invalid-feedback">
            Passwords should be match.
          </div>
        </div>
        <p class="mt-5 mb-3 text-body-secondary">
          Already have an account? <Link to='/login' className="text-reset">Sign-in!</Link>
        </p>
        <button disabled={isDisabled} className="btn btn-primary w-100 py-2" type="submit">Sign up</button>
      </form>
    </div>
    </div>
  );
};

export default Registration;
