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

  const btnFavorite = cn('btn', 'col-auto', 'btn-secondary', {
    active: isAddedToFavorite
  });
  const btnCart = cn('btn', 'col-auto', 'btn-outline-secondary', {
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
    <div className="row-md-6">
    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
      <div className="col p-4 d-flex flex-column position-static">
        <h3 className="mb-0">{title}</h3>
        <p className="card-text mb-auto">{description}</p>
        <h2>{price}</h2>
        <div className='row gap-2'>
          <button className={btnFavorite} onClick={handleBtnFavorite}>В избранное</button>
          <button className={btnCart} onClick={handleBtnCart}>В корзину</button>
        </div>
      </div>
      <div className="col-auto d-none d-lg-block">
        <img width={'auto'} height={250} src={image} alt="Product image" />
      </div>
    </div>
    </div>
  );
};

export default FavoriteCard;
