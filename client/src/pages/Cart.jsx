import CartProductCard from "../components/CartProductCard";
import { useSelector } from "react-redux";
import Header from '../components/Header.jsx';
import { useGetCartQuery } from '../slices/api/cartApi.js';
import { useCreateOrderMutation } from "../slices/api/ordersApi.js";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
import { useSyncTab } from "../SyncTabHook.js";

const Cart = () => {
  useSyncTab();
  const { data } = useGetCartQuery();
  const navigate = useNavigate();
  const [createOrder, { isSuccess, isError, error, isLoading }] = useCreateOrderMutation();
  const { totalAmount, products } = useSelector((state) => state.cart);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const order = products.map(({ productId, quantity }) => ({ productId, quantity }));
    console.log(order)
    createOrder(order);
  };

  useEffect(() => {
    if (isError) {
      if (error.status == 401) {
        navigate('/login');
      }
    }
  }, [isError]);

  return (
    <>
    <Header/>
    <div className='container'>
      {
        isSuccess ?
        <SuccessHero/> :
        products.length == 0 ? 
        <EmptyHero/> :
        <>
          <h1 className='pb-4'>Ваша корзина</h1>
          {products.map(({ id, productId, title, price, image, quantity }) =>
            <CartProductCard
              key={id}
              productId={productId}
              title={title}
              price={price}
              image={image}
              quantity={quantity}
            />
          )}
          <form onSubmit={e => handleSubmit(e)}>
            <h2>{totalAmount}</h2>
            <button type='submit' className='btn btn-primary'>
              {
                isLoading ?
                <>
                  <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                  <span role="status">Оформление...</span>
                </> :
                'Place an order'
              }
            </button>
          </form>
        </>
      }
    </div>
    </>
  )
};

const EmptyHero = () => {
  return (
    <div class="px-4 py-5 my-5 text-center">
      <h1 class="display-5 fw-bold">Ваша корзина пуста.</h1>
      <div class="col-lg-6 mx-auto">
      <p class="lead mb-4">
        Корзина пуста. Можете посмотреть каталог или свои избранные если хотите заказать что-то.
      </p>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <Link to='/'>
          <button type="button" class="btn btn-primary btn-lg px-4 gap-3">Каталог</button>
        </Link>
        <Link to='/favorites'>
          <button type="button" class="btn btn-outline-secondary btn-lg px-4">Избранные</button>
        </Link>
      </div>
      </div>
    </div>
  );
};

const SuccessHero = () => (
  <div class="px-4 py-5 my-5 text-center">
    <h1 class="display-5 fw-bold  text-success">Успех!</h1>
    <div class="col-lg-6 mx-auto">
    <p class="lead mb-4">
      Спасибо за выбор нашего магаина! Ваш заказ успешно оформлен. Можете посмотреть его статус на странице заказов или продолжить покупки.
    </p>
    <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
      <Link to='/orders'>
        <button type="button" class="btn btn-primary btn-lg px-4 gap-3">Заказы</button>
      </Link>
      <Link to='/'>
        <button type="button" class="btn btn-outline-secondary btn-lg px-4">Каталог</button>
      </Link>
    </div>
    </div>
  </div>
);

export default Cart;
