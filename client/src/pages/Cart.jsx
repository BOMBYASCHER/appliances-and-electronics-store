import CartProductCard from "../components/CartProductCard";
import { useSelector } from "react-redux";
import Header from '../components/Header.jsx';
import { useGetCartQuery } from '../slices/api/cartApi.js';
import { useCreateOrderMutation } from "../slices/api/ordersApi.js";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const Cart = () => {
  const { data, refetch } = useGetCartQuery();
  const [createOrder, { isSuccess }] = useCreateOrderMutation();
  const { totalAmount, products } = useSelector((state) => state.cart);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const order = products.map(({ productId, quantity }) => ({ productId, quantity }));
    console.log(order)
    createOrder(order);
  };

  // useEffect(() => {
  //   if (isSuccess) {
  //     refetch();
  //   }
  // }, [isSuccess]);

  return (
    <>
    <Header/>
    <div className='container'>
        {isSuccess ?
        <SuccessHero/> :
        <>
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
          <button type='submit' className='btn btn-primary'>Order</button>
        </form>
        </>
        }
    </div>
    </>
  )
};

const SuccessHero = () => (
  <div class="px-4 py-5 my-5 text-center">
    <h1 class="display-5 fw-bold  text-success">Success!</h1>
    <div class="col-lg-6 mx-auto">
    <p class="lead mb-4">
      Thank you for choosing our store! The order was successfully placed. You can go to the orders page or continue shopping.
    </p>
    <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
      <Link to='/orders'>
        <button type="button" class="btn btn-primary btn-lg px-4 gap-3">Orders page</button>
      </Link>
      <Link to='/'>
        <button type="button" class="btn btn-outline-secondary btn-lg px-4">Catalog</button>
      </Link>
    </div>
    </div>
  </div>
);

export default Cart;
