import cn from 'classnames';
import { useContext, useState } from 'react';
import { addToCart, addToFavorite, deleteFromCart, deleteFromFavorite, useProductsDispatch } from '../ProductsContext';
import { useAddFavoriteMutation, useDeleteFavoriteMutation } from '../slices/api/favoritesApi';
import { useAddProductToCartMutation, useDeleteProductFromCartMutation } from '../slices/api/cartApi';

const ProductCard = ({ id, title, description, price, image, isFavorite, isInCart }) => {
  const [isAddedToFavorite, setIsAddedToFavorite] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const [addFavorite] = useAddFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();

  const [addToCart] = useAddFavoriteMutation();
  const [deleteFromCart] = useDeleteFavoriteMutation();

  const btnFavorite = cn('btn', 'btn-favorite', {
    active: isAddedToFavorite
  });
  const btnCart = cn('btn', 'btn-cart', {
    active: isAddedToCart
  });

  const handleBtnFavorite = () => {
    console.log('ID: ' + id)
    if (isAddedToFavorite) {
      deleteFavorite(id);
      setIsAddedToFavorite(false);
    } else if (!isAddedToFavorite) {
      addFavorite(id);
      setIsAddedToFavorite(true);
    }
  };

  const handleBtnCart = () => {
    if (isAddedToCart) {
      deleteFromCart(id);
      setIsAddedToCart(false);
    } else if (!isAddedToCart) {
      addToCart(id);
      setIsAddedToCart(true);
    }
  };

  return (
    <div>
      <div>
        <img src={image} alt="Product image" />
      </div>
      <h1>{title}</h1>
      <p>{description}</p>
      <h2>{price}</h2>
      <button className={btnFavorite} onClick={handleBtnFavorite}>To Favorites</button>
      <button className={btnCart} onClick={handleBtnCart}>To Cart</button>
    </div>
  )
}

export default ProductCard;
