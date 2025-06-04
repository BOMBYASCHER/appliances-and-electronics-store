import cn from 'classnames';
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { useCreateReturnMutation } from '../slices/api/returnsApi';
import { useLazyGetProductsQuery } from '../slices/api/productsApi';
import { useLazyGetFavoritesQuery } from '../slices/api/favoritesApi';
import { useLazyGetCartQuery } from '../slices/api/cartApi';

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
    if (reason === 'defect/damage' && photo == null) {
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
    if (value === 'defect/damage') {
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

  const formClassName = cn('d-grid gap-2');

  return (
    <div className='container py-5'>
    {isSuccess ? 
    <SuccessHero/> :
    <div className="d-grid align-items-center gap-2 w-75">
      <form className={formClassName} onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 fw-normal">Please fill out the form</h1>
          <div className="card">
            <div className="card-body">
            <div className="row g-0">
              <div className="col-md-8">
                <p className="card-title fs-5">Purchase info from the order <strong>{formInfo.orderTitle}</strong></p>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <div className="d-flex justify-content-between">
                      <p>Product title</p>
                      <p>{formInfo.title}</p>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="d-flex justify-content-between">
                      <p>Price</p>
                      <p>{formInfo.price}</p>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="d-flex justify-content-between">
                      <p>Quantity</p>
                      <p>{formInfo.quantity}</p>
                    </div>
                  </li>
                  <li className="list-group-item">
                    <div className="d-flex justify-content-between">
                      <p>Date of purchase</p>
                      <p>{new Date(formInfo.date).toLocaleDateString()}</p>
                    </div>
                  </li>
                </ul>
                </div>
                <div className="col-md-4">
                  <img src={formInfo.image} height={200}/>
                </div>
              </div>
            </div>  
          </div>
        <div className="form-floating form-group required">
          <select defaultValue='' required className={reasonSelect} onChange={e => handleSelect(e)}>
            {isDisabledOption ? null : <option value=''></option>}
            <option value="defect/damage">defect/damage</option>
            <option value="did not fit">did not fit</option>
            <option value="product does not match description">product does not match description</option>
          </select>
          <label className='opacity-75'>Reason of the return:</label>
          <div className="invalid-feedback">
            Choose one variant.
          </div>
        </div>
        <label className="w-50 input-group-text">Upload a photo of the purchase</label>
        <div className="input-group mb-3">
          <input type="file" accept='image/*' className={photoInput} onChange={handleFileChange}/>
        </div>
        <button disabled={isDisabled} className="btn btn-primary w-25 py-2" type="submit">Send</button>
      </form>
    </div>
    }
    </div>
  );
};

const SuccessHero = () => (
  <div className="px-4 py-5 my-5 text-center">
    <h1 className="display-5 fw-bold  text-success">Success!</h1>
    <div className="col-lg-6 mx-auto">
    <p className="lead mb-4">
      The return was successfully done. You can go to the returns page or continue checking orders.
    </p>
    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
      <Link to='/returns'>
        <button type="button" className="btn btn-primary btn-lg px-4 gap-3">Returns page</button>
      </Link>
      <Link to='/orders'>
        <button type="button" className="btn btn-outline-secondary btn-lg px-4">Orders page</button>
      </Link>
    </div>
    </div>
  </div>
);

export default ReturnForm;
