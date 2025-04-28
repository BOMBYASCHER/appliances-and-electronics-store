import cn from 'classnames';
import { useState } from "react";

const FavoriteCard = ({ productId, title, description, price, image, isInCart }) => {
  const [isAddedToFavorite, setIsAddedToFavorite] = useState(true);
  const [isAddedToCart, setIsAddedToCart] = useState(isInCart);

  const btnFavorite = cn('btn', 'btn-favorite', {
    active: isAddedToFavorite
  });
  const btnCart = cn('btn', 'btn-cart', {
    active: isAddedToCart
  });

  const handleBtnFavorite = () => {
    if (isAddedToCart) {
      dispatch(deleteFromFavorite(productId))
      setIsAddedToFavorite(false);
    } else if (!isAddedToCart) {
      dispatch(addToFavorite(productId))
      setIsAddedToFavorite(true);
    }
  };
  const handleBtnCart = () => {
    if (isAddedToCart) {
      dispatch(deleteFromCart(productId))
      setIsAddedToCart(false);
    } else if (!isAddedToCart) {
      dispatch(addToCart(productId))
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
        <div>
          <button className={btnFavorite} onClick={handleBtnFavorite}>To Favorites</button>
          <button className={btnCart} onClick={handleBtnCart}>To Cart</button>
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
