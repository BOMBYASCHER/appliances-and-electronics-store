import { useAddFavoriteMutation, useDeleteFavoriteMutation } from '../slices/api/favoritesApi';
import { useAddProductToCartMutation, useDeleteProductFromCartMutation } from '../slices/api/cartApi';
import { NavLink } from 'react-router';
import '../assets/style/style.css';

const ProductCard = ({ id, title, description, price, image, isFavorite, isInCart }) => {
  const [addFavorite] = useAddFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();

  const [addToCart] = useAddProductToCartMutation();
  const [deleteFromCart] = useDeleteProductFromCartMutation();

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
    <div className="product-card">
      <img src={image} alt="Product image" />
        <h4>{title}</h4>
        <p>{price}</p>
        <button className="product-favorites-button" onClick={handleBtnFavorite}>В избранное</button>
        <button className="product-buy-button" onClick={handleBtnCart}>В корзину</button>
        <NavLink to={`/product/${id}`}>
          <button className="product-button">Подробнее</button>
        </NavLink>
    </div>
  );
};

export default ProductCard;
