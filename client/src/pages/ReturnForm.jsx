import cn from 'classnames';
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { useCreateReturnMutation } from '../slices/api/returnsApi';
import { useLazyGetProductsQuery } from '../slices/api/productsApi';
import { useLazyGetFavoritesQuery } from '../slices/api/favoritesApi';
import { useLazyGetCartQuery } from '../slices/api/cartApi';
import style from '../assets/style/ReturnForm.css?inline';

const ReturnForm = () => {
  const [createReturn, { isLoading, isSuccess, isError }] = useCreateReturnMutation();
  const [productsTrigger] = useLazyGetProductsQuery();
  const [favoritesTrigger] = useLazyGetFavoritesQuery();
  const [cartTrigger] = useLazyGetCartQuery();
  const location = useLocation();
  const formInfo = location.state;
  const [reason, setReason] = useState(null);
  const [isValidReason, setIsValidReason] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabledOption, setIsDisabledOption] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [isValidPhoto, setIsValidPhoto] = useState(null);

  const photoInput = cn('form-control', {
    'is-valid': isValidPhoto == null ? false : isValidPhoto,
    'is-invalid': isValidPhoto == null ? false : !isValidPhoto,
  });

  const reasonSelect = cn('form-select', 'w-50', {
    'is-valid': isValidReason == null ? false : isValidReason,
    'is-invalid': isValidReason == null ? false : !isValidReason,
  });

  useEffect(()=>{
    if (isSuccess) {
      productsTrigger();
      favoritesTrigger();
      cartTrigger();
      // navigate('/', { replace: true });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (reason == null && photo == null) {
      setIsValidReason(null);
      setIsValidPhoto(null);
      setIsDisabled(true);
    }
    if (reason != null) {
      setIsValidReason(true);
    }
    if (photo != null) {
      setIsValidPhoto(true);
    }
    if (reason != null && photo != null) {
      setIsValidReason(true);
      setIsValidPhoto(true);
      setIsDisabled(false);
    }
    if (reason === 'дефект/повреждение' && photo == null) {
      setIsValidReason(true);
      setIsValidPhoto(false);
      setIsDisabled(true);
    }
  }, [reason, photo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createReturn({
      orderId: formInfo.orderId,
      purchaseId: formInfo.purchaseId,
      reason,
      photo,
    });
  };

  const handleSelect = ({ target: { value } }) => {
    setIsDisabledOption(true)
    setReason(value);
    if (value === 'дефект/повреждение') {
      setIsValidReason(true);
      if (photo == null) {
        setIsValidPhoto(photo != null);
        setIsDisabled(true);
      }
    } else if (value !== '') {
      setIsValidReason(true)
      setIsValidPhoto(null);
      setIsDisabled(false);
    }
  };

  const handleFileChange = ({ target: { files } }) => {
    if (files[0]) {
      setPhoto(files[0]);
    } else {
      setPhoto(null);
      setIsValidPhoto(null);
    }
  };

  return (
    <>
    <style type='text/css'>{style}</style>
    {isSuccess ? 
    <SuccessHero/> :
    <form onSubmit={handleSubmit}>
      <div className="return-form">
        <h2>Пожалуйста, заполните форму</h2>
        <div className="product-info">
          <img src={formInfo.image}/>
          <div>
            <p><strong>Информация о покупке из заказа {formInfo.orderTitle}</strong></p>
            <p><strong>Название товара: {formInfo.title}</strong></p>
            <p><strong>Цена: {formInfo.price}</strong></p>
            <p><strong>Количество: {formInfo.quantity}</strong></p>
            <p><strong>Дата покупки: {new Date(formInfo.date).toLocaleDateString()}</strong></p>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="return-reason">Причина возврата:</label>
          <select id="return-reason" defaultValue='' required className={reasonSelect} onChange={e => handleSelect(e)}>
            {isDisabledOption ? null : <option value=''></option>}
            <option value="дефект/повреждение">дефект/повреждение</option>
            <option value="не подходит">не подходит</option>
            <option value="товар не соответствует описанию">товар не соответствует описанию</option>
          </select>
          {/* <div className="invalid-feedback">
            Выберите один вариант.
          </div> */}
        </div>
        <div className='form-group'>
          <label htmlFor='photo-upload' className="w-50 input-group-text">Прикрепите фотографию покупки</label>
          <input id="photo-upload" type="file" accept='image/*' className={photoInput} onChange={handleFileChange}/>
        </div>
        <div className='form-group'>
          {
            isLoading ?
            <button disabled={isDisabled} type="submit">Оформление...</button> :
            <button disabled={isDisabled} type="submit">Оформить возврат</button>
          }
        </div>
      </div>
    </form>
    }
    </>
  );
};

const SuccessHero = () => (
  <></>
  // <div className="px-4 py-5 my-5 text-center">
  //   <h1 className="display-5 fw-bold  text-success">Успех!</h1>
  //   <div className="col-lg-6 mx-auto">
  //   <p className="lead mb-4">
  //     Возврат успешно оформлен. Вы можете перейти на страницу возвратов или продолжить проверку заказов.
  //   </p>
  //   <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
  //     <Link to='/returns'>
  //       <button type="button" className="btn btn-primary btn-lg px-4 gap-3">Возвраты</button>
  //     </Link>
  //     <Link to='/orders'>
  //       <button type="button" className="btn btn-outline-secondary btn-lg px-4">Заказы</button>
  //     </Link>
  //   </div>
  //   </div>
  // </div>
);

export default ReturnForm;
