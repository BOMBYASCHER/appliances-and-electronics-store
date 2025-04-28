import React, { useEffect } from 'react';
import { useState } from "react";
import CartProductCard from "../components/CartProductCard";
import { useDispatch, useSelector } from "react-redux";
import {  } from '../slices/cartReducer';
import Header from '../components/Header.jsx';

const Cart = () => {
  // const [totalAmount, setTotalAmout] = useState(0);
  // const [cartElements, setCartElements] = useState([]);

  const cartElements = []
  const totalAmount = 0

  // useEffect(() => {
  //   DataTransfer.getCart()
  //     .then(cart => {
  //       const { totalAmount, elements } = cart;
  //       setTotalAmout(totalAmount);
  //       setCartElements(elements);
  //     });
  // }, []);

  useEffect(() => {
  }, [cartElements]);

  return (
    <div>
      <Header/>
      <h1>Cart page</h1>
      {cartElements.map(({ id, productId, title, price, image, quantity }) => 
        <CartProductCard
          key={id}
          productId={productId}
          title={title}
          price={price}
          image={image}
          quantity={quantity}
        />
      )}
      <h2>{totalAmount}</h2>
      <button>Order</button>
    </div>
  )
}

export default Cart;
