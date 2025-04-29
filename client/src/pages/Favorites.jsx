import FavoriteCard from '../components/FavoriteProductCard.jsx';
import { useSelector } from 'react-redux';
import Header from '../components/Header.jsx';
import { useGetFavoritesQuery } from '../slices/api/favoritesApi.js';

const Favorites = () => {
  const { data } = useGetFavoritesQuery();
  const { favorites } = useSelector((state) => state.favorites)

  return (
    <>
      <Header/>
      <div className='container'>
        <h1>Favorites page</h1>
        <div className='col mb-2'>
          {favorites.map(({ id, productId, title, description, price, image, isInCart }) => {
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
