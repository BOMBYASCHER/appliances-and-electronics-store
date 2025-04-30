import cn from 'classnames';
import { useState } from 'react';
import { useAddFavoriteMutation, useDeleteFavoriteMutation } from '../slices/api/favoritesApi';
import { useAddProductToCartMutation, useDeleteProductFromCartMutation } from '../slices/api/cartApi';

const ProductCard = ({ id, title, description, price, image, isFavorite, isInCart }) => {
  const [isAddedToFavorite, setIsAddedToFavorite] = useState(isFavorite);
  const [isAddedToCart, setIsAddedToCart] = useState(isInCart);
  const [isFullText, setIsFullText] = useState(false);

  const [addFavorite] = useAddFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();

  const [addToCart] = useAddProductToCartMutation();
  const [deleteFromCart] = useDeleteProductFromCartMutation();

  const container = cn('col');

  const btnFavorite = cn('btn', 'btn-favorite', 'btn-sm btn-outline-secondary', {
    active: isAddedToFavorite
  });
  const btnCart = cn('btn', 'btn-cart', 'btn-sm btn-outline-secondary', {
    active: isAddedToCart
  });

  const handleBtnFavorite = () => {
    if (isAddedToFavorite) {
      deleteFavorite(id);
      setIsAddedToFavorite(false);
    } else if (!isAddedToFavorite) {
      addFavorite({ productId: id, title, description, price, image, isFavorite, isInCart });
      setIsAddedToFavorite(true);
    }
  };

  const handleBtnCart = () => {
    if (isAddedToCart) {
      deleteFromCart(id);
      setIsAddedToCart(false);
    } else if (!isAddedToCart) {
      addToCart({ productId: id, title, price, image });
      setIsAddedToCart(true);
    }
  };

  return (
    <div className={container}>
      <div>
        <img className='img-fluid img-thumbnail' src={image} alt="Product image" />
      </div>
      <div className='card-body'>
        <h3>{title}</h3>
        <p className='card-text fw-light'>
          {isFullText ? description : description.slice(0, 150).concat('...', '\n')}
          <a className='text-reset' onClick={() => setIsFullText(!isFullText)}>read more</a>
        </p>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='btn-group'>
            <button className={btnFavorite} onClick={handleBtnFavorite}>To Favorites</button>
            <button className={btnCart} onClick={handleBtnCart}>To Cart</button>
          </div>
          <div className='p-2 mb-2 text-bg-success rounded-2'>{price}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
