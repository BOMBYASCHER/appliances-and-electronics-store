import cn from 'classnames';
import { useState } from 'react';
import { useAddFavoriteMutation, useDeleteFavoriteMutation } from '../slices/api/favoritesApi';
import { useAddProductToCartMutation, useDeleteProductFromCartMutation } from '../slices/api/cartApi';
import ProductModal from './ProductModal';

const ProductCard = ({ id, title, description, price, image, isFavorite, isInCart }) => {
  const [showModal, setShowModal] = useState(false);

  const [addFavorite] = useAddFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();

  const [addToCart] = useAddProductToCartMutation();
  const [deleteFromCart] = useDeleteProductFromCartMutation();

  const container = cn('col');

  const btnFavorite = cn('btn', 'btn-favorite', 'btn-sm btn-outline-secondary', {
    active: isFavorite
  });
  const btnCart = cn('btn', 'btn-cart', 'btn-sm btn-outline-secondary', {
    active: isInCart
  });

  const handleBtnFavorite = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      deleteFavorite(id);
    } else if (!isFavorite) {
      addFavorite({ productId: id, title, description, price, image, isFavorite, isInCart });
    }
  };

  const handleBtnCart = (e) => {
    e.stopPropagation();
    if (isInCart) {
      deleteFromCart(id);
    } else if (!isInCart) {
      addToCart({ productId: id, title, price, image });
    }
  };

  return (
    <>
      <div className={container} onClick={() => setShowModal(true)}>
        <div>
          <img className='img-fluid img-thumbnail' src={image} alt="Product image" />
        </div>
        <div className='card-body'>
          <h3>{title}</h3>
          <p style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {description}
          </p>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='btn-group'>
              <button className={btnFavorite} onClick={handleBtnFavorite}>В избранное</button>
              <button className={btnCart} onClick={handleBtnCart}>В корзину</button>
            </div>
            <div className='p-2 mb-2 text-bg-success rounded-2'>{price}</div>
          </div>
        </div>
      </div>

      {showModal && (
        <ProductModal
          id={id}
          title={title}
          description={description}
          price={price}
          image={image}
          isFavorite={isFavorite}
          isInCart={isInCart}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
