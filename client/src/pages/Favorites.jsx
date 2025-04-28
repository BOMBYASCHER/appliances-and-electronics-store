import { useEffect, useState } from 'react';
import FavoriteCard from '../components/FavoriteProductCard.jsx';
import { useSelector } from 'react-redux';
import { useGetProductByIdMutation } from '../slices/api/productsApi.js';
import Header from '../components/Header.jsx';
import { useGetFavoritesQuery } from '../slices/api/favoritesApi.js';

const Favorites = () => {
  const { data } = useGetFavoritesQuery();
  const { favorites: favoriteProductIds } = useSelector((state) => state.favorites)
  const [getFavorite] = useGetProductByIdMutation();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const result = [];
    favoriteProductIds.forEach((productId) => {
      getFavorite(productId)
        .then(favorite => {
          const { data } = favorite;
          result.push(data);
        });
    });
    setFavorites(result);
  }, []);

  return (
    <>
      <Header/>
      <div className='container'>
        <h1>Favorites page</h1>
        <div className='col mb-2'>
          {favorites.map(({ id, productId, title, description, price, image, isInCart }) => (
            <FavoriteCard
              key={id}
              productId={productId}
              title={title}
              description={description}
              price={price}
              image={image}
              isInCart={isInCart}
            />
          ))}
        </div>
      </div> 
    </>
  );
};

export default Favorites;
