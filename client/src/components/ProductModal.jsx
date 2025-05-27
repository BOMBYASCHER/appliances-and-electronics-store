import cn from 'classnames';
import { useAddFavoriteMutation, useDeleteFavoriteMutation } from '../slices/api/favoritesApi';
import { useAddProductToCartMutation, useDeleteProductFromCartMutation } from '../slices/api/cartApi';

const ProductModal = ({ id, title, description, price, image, isFavorite, isInCart, onClose }) => {
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
    } else {
      addFavorite({ productId: id, title, description, price, image, isFavorite, isInCart });
    }
  };

  const handleBtnCart = (e) => {
    e.stopPropagation();
    if (isInCart) {
      deleteFromCart(id);
    } else {
      addToCart({ productId: id, title, price, image });
    }
  };

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog" style={{ maxWidth: '75%' }}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className={container}>
              <div>
                <img className='img-fluid img-thumbnail' src={image} alt="Product image" />
              </div>
              <div className='card-body'>
                <h3>{title}</h3>
                <p className='card-text fw-light'>{description}</p>
                <div className='d-flex justify-content-between align-items-center'>
                  <div className='btn-group'>
                  <button className={btnFavorite} onClick={handleBtnFavorite}>To Favorites</button>
                  <button className={btnCart} onClick={handleBtnCart}>To Cart</button>
                </div>
                  <div className='p-2 mb-2 text-bg-success rounded-2'>{price}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
