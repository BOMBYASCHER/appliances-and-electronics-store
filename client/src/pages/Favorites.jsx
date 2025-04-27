import { useEffect, useState } from 'react';
import FavoriteCard from '../components/FavoriteProductCard.jsx';
import { useProductsMarks } from '../ProductsContext.jsx';
import { useSelector } from 'react-redux';
import { useGetProductByIdMutation } from '../slices/api/productsApi.js';

const Favorites = () => {
  const [getFavorite] = useGetProductByIdMutation();
  const { favorites: favoriteProductIds } = useSelector((state) => state.favorites)

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    favoriteProductIds.forEach(productId => {
      console.log(productId)
      getFavorite(productId)
        .then(favorite => {
          console.log('Favorite object: ')
          // console.log(favorite)
          const { data } = favorite;
          console.log(data)
          setFavorites([...favorites, data])
        });
    });
  }, []);

  useEffect(() => {
    console.log(favorites)
  }, [favorites])

  const headers = ['One', 'Two'];
  return (
    <div>
      <h1>Favorites page</h1>
      <div>
        {favorites.map(({ id, productId, title, description, price, image, isInCart }) => {
          return <FavoriteCard
            key={id}
            productId={productId}
            title={title}
            description={description}
            price={price}
            image={image}
            isInCart={isInCart}
          />
        })}
      </div>
    </div>
  )
}

export default Favorites;
