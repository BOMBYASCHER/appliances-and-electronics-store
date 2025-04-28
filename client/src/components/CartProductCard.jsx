import { useState } from 'react';
// import { addToCart, addToFavorite, deleteFromCart, deleteFromFavorite } from '../ProductsContext.jsx';

const CartProductCard = ({ productId, title, price, image, isFavorite, quantity }) => {
  const dispatch = useProductsDispatch();

  const [isAddedToCart, setIsAddedToCart] = useState(true);
  const [isAddedToFavorite, setIsAddedToFavorite] = useState(isFavorite);
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  const btnFavorite = cn('btn', 'btn-favorite', {
    active: isAddedToFavorite
  });
  const btnCart = cn('btn', 'btn-cart', {
    active: isAddedToCart
  });

  // const handleBtnFavorite = () => {
  //   if (isAddedToCart) {
  //     dispatch(deleteFromFavorite(productId))
  //     setIsAddedToFavorite(false);
  //   } else if (!isAddedToCart) {
  //     dispatch(addToFavorite(productId))
  //     setIsAddedToFavorite(true);
  //   }
  // };
  // const handleBtnCart = () => {
  //   if (isAddedToCart) {
  //     dispatch(deleteFromCart(productId))
  //     setIsAddedToCart(false);
  //   } else if (!isAddedToCart) {
  //     dispatch(addToCart(productId))
  //     setIsAddedToCart(true);
  //   }
  // };

  // const handleBtnQuantityDec = () => {
  //   setCurrentQuantity(currentQuantity + 1);
  // };
  // const handleBtnQuantityInc = () => {
  //   setCurrentQuantity(currentQuantity - 1);
  // };

  return (
    <div>
      <div>
        <img src={image} alt="Product image" />
      </div>
      <h1>{title}</h1>
      <h2>{price}</h2>
      <button className={btnFavorite} onClick={handleBtnFavorite}>To Favorites</button>
      <button className={btnCart} onClick={handleBtnCart}>To Cart</button>
      <div>
        <label>
          Quantity:
          <input type='number' value={currentQuantity}></input>
        </label>
        <button onClick={handleBtnQuantityDec}></button>
        <button onClick={handleBtnQuantityInc}></button>
      </div>
    </div>
  );
};

export default CartProductCard;