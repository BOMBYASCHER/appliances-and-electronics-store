import FavoriteCard from '../components/FavoriteProductCard.jsx';
import { useSelector } from 'react-redux';
import Header from '../components/Header.jsx';
import { useGetFavoritesQuery } from '../slices/api/favoritesApi.js';
import { getCart, getFavorites } from '../stateSelectors.js';
import { useEffect } from 'react';

const Favorites = () => {
  const { refetch } = useGetFavoritesQuery();
  const { favorites } = useSelector(getFavorites);
  const { products } = useSelector(getCart);

  const syncedFavorites = favorites.map(favorite => {
    const isInCart = products.find(({ productId }) => productId == favorite.productId) !== undefined;
    return { ...favorite, isInCart }
  });

  return (
    <>
      <Header/>
      <div className='container'>
        <h1>Favorites page</h1>
        <div className='col mb-2'>
          {syncedFavorites.map(({ id, productId, title, description, price, image, isInCart }) => {
            return (
            <FavoriteCard
              key={id}
              productId={productId}
              title={title}
              description={description}
              price={price}
              image={image}
              isInCart={isInCart}
            />
          )})}
        </div>
      </div> 
    </>
  );
};

export default Favorites;
