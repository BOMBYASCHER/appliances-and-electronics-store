import React from 'react';
import { useState } from "react";
import DataTransfer from "../DataTransfer";
import CartProductCard from "../components/CartProductCard";
import { useDispatch, useSelector } from "react-redux";
import {  } from '../slices/cartReducer';

const Cart = () => {
  const context = useProductsMarks();

  // const [totalAmount, setTotalAmout] = useState(0);
  // const [cartElements, setCartElements] = useState([]);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const cartElements = useSelector((state) => state.cart.elements);
  const dispatch = useDispatch();

  

  // useEffect(() => {
  //   DataTransfer.getCart()
  //     .then(cart => {
  //       const { totalAmount, elements } = cart;
  //       setTotalAmout(totalAmount);
  //       setCartElements(elements);
  //     });
  // }, []);

  useEffect(() => {
    dispatch()
  }, [cartElements]);

  return (
    <div>
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
