import cn from 'classnames';
import { useState } from "react";
import { useAddFavoriteMutation, useDeleteFavoriteMutation } from '../slices/api/favoritesApi';
import { useAddProductToCartMutation, useDeleteProductFromCartMutation } from '../slices/api/cartApi';

const FavoriteCard = ({ productId, title, description, price, image, isInCart }) => {
  const [isAddedToFavorite, setIsAddedToFavorite] = useState(true);
  const [isAddedToCart, setIsAddedToCart] = useState(isInCart);

  const [addFavorite] = useAddFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation()

  const [addToCart] = useAddProductToCartMutation();
  const [deleteFromCart] = useDeleteProductFromCartMutation();

  const btnFavorite = cn('remove-btn', {
    active: isAddedToFavorite
  });
  const btnCart = cn('add-to-cart', {
    active: isAddedToCart
  });

  const handleBtnFavorite = () => {
    if (isAddedToFavorite) {
      deleteFavorite(productId);
    } else if (!isAddedToFavorite) {
      addFavorite(productId);
    }
  };

  const handleBtnCart = () => {
    if (isAddedToCart) {
      deleteFromCart(productId);
      setIsAddedToCart(false);
    } else if (!isAddedToCart) {
      addToCart({ productId, title, price, image });
      setIsAddedToCart(true);
    }
  };

  return (
    <tr>
      <td>
        <img src={image} alt="favorite product" className="product-image" />
      </td>
      <td>{title}</td>
      <td>{description}</td>
      <td>{price}</td>
      <td>
          <button className={btnFavorite} onClick={handleBtnFavorite}>❤️</button>
          <button className={btnCart} onClick={handleBtnCart}>Добавить в корзину</button>
      </td>
    </tr>
  );
};

export default FavoriteCard;
