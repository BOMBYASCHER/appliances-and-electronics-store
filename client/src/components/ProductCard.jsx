import cn from 'classnames';
import { useContext, useState } from 'react';
import DataTransfer from '../DataTransfer';
import { addToCart, addToFavorite, deleteFromCart, deleteFromFavorite, useProductsDispatch } from '../ProductsContext';

const ProductCard = ({ id, title, description, price, image, isFavorite, isInCart }) => {
  const [isAddedToFavorite, setIsAddedToFavorite] = useState(isFavorite);
  const [isAddedToCart, setIsAddedToCart] = useState(isInCart);

  const dispatch = useProductsDispatch();

  const btnFavorite = cn('btn', 'btn-favorite', {
    active: isAddedToFavorite
  });
  const btnCart = cn('btn', 'btn-cart', {
    active: isAddedToCart
  });

  const handleBtnFavorite = () => {
    if (isAddedToFavorite) {
      dispatch(deleteFromFavorite(id));
      setIsAddedToFavorite(false);
    } else if (!isAddedToFavorite) {
      dispatch(addToFavorite(id));
      setIsAddedToFavorite(true);
    }
    
    // if (isAddedToFavorite) {
    //   DataTransfer.deleteProductFromFavorites(id)
    //     .then(response => {
    //       if (response.status == 204) {
    //         setIsAddedToFavorite(false);
    //       }
    //     });
    // } else {
    //   DataTransfer.postProductToFavorites(id)
    //     .then(response => {
    //       if (response.status == 201) {
    //         setIsAddedToFavorite(true);
    //       }
    //     });
    // }
  };
  const handleBtnCart = () => {
    if (isAddedToCart) {
      dispatch(deleteFromCart(id));
      setIsAddedToCart(false);
    } else if (!isAddedToCart) {
      dispatch(addToCart(id));
      setIsAddedToCart(true);
    }
    // if (isAddedToCart) {
    //   DataTransfer.deleteProductFromCart(id)
    //     .then(response => {
    //       if (response.status == 204) {
    //         setIsAddedToCart(false);
    //       }
    //     });
    // } else {
    //   DataTransfer.postProductToCart(id)
    //     .then(response => {
    //       if (response.status == 201) {
    //         setIsAddedToCart(true);
    //       }
    //     });
    // }
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

const postFavorites = (id) => {
  let success = false;
  DataTransfer.postProductToFavorites(id)
    .then(response => {
      if (response.status == 201 || response.status == 401) {
        success = true;
      }
    });
  return success
};

export default ProductCard;
