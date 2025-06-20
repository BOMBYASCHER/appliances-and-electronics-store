import CartProductCard from "../components/CartProductCard";
import { useSelector } from "react-redux";
import Header from '../components/Header.jsx';
import { useGetCartQuery } from '../slices/api/cartApi.js';
import { useCreateOrderMutation } from "../slices/api/ordersApi.js";
import { Link, useNavigate } from "react-router";
import { useEffect } from "react";
import { useSyncTab } from "../SyncTabHook.js";
import Footer from "../components/Footer.jsx";
import style from '../assets/style/Cart.css?inline';

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
    <style type='text/css'>{style}</style>
    <Header/>
    <div className='container-cart'>
      {
        isSuccess ?
        <SuccessHero/> :
        products.length == 0 ? 
        <EmptyHero/> :
        <>
          <h1 className="text-cart">Ваша корзина</h1>
          <table className="cart-table">
            <thead>
                <tr>
                    <th>Изображение</th>
                    <th>Товар</th>
                    <th>Цена</th>
                    <th>Количество</th>
                    <th>Итого</th>
                </tr>
            </thead>
            <tbody>
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
            </tbody>
          </table>
          <form onSubmit={e => handleSubmit(e)}>
            <div className="summary">
              <div className="grand-total">
                  <span>Итоговая сумма:</span>
                  <span>{totalAmount}</span>
              </div>
              {
                isLoading ?
                <button type='submit' className="checkout-btn">Оформление...</button> :
                <button type='submit' className="checkout-btn">Оформить заказ</button>
              }
            </div>
          </form>
        </>
      }
    </div>
    <Footer/>
    </>
  )
};

const EmptyHero = () => {
  return (
    <></>
    // <div className="px-4 py-5 my-5 text-center">
    //   <h1 className="display-5 fw-bold">Ваша корзина пуста.</h1>
    //   <div className="col-lg-6 mx-auto">
    //   <p className="lead mb-4">
    //     Корзина пуста. Можете посмотреть каталог или свои избранные если хотите заказать что-то.
    //   </p>
    //   <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
    //     <Link to='/'>
    //       <button type="button" className="btn btn-primary btn-lg px-4 gap-3">Каталог</button>
    //     </Link>
    //     <Link to='/favorites'>
    //       <button type="button" className="btn btn-outline-secondary btn-lg px-4">Избранные</button>
    //     </Link>
    //   </div>
    //   </div>
    // </div>
  );
};

const SuccessHero = () => (
  <></>
  // <div className="px-4 py-5 my-5 text-center">
  //   <h1 className="display-5 fw-bold  text-success">Успех!</h1>
  //   <div className="col-lg-6 mx-auto">
  //   <p className="lead mb-4">
  //     Спасибо за выбор нашего магаина! Ваш заказ успешно оформлен. Можете посмотреть его статус на странице заказов или продолжить покупки.
  //   </p>
  //   <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
  //     <Link to='/orders'>
  //       <button type="button" className="btn btn-primary btn-lg px-4 gap-3">Заказы</button>
  //     </Link>
  //     <Link to='/'>
  //       <button type="button" className="btn btn-outline-secondary btn-lg px-4">Каталог</button>
  //     </Link>
  //   </div>
  //   </div>
  // </div>
);

export default Cart;
