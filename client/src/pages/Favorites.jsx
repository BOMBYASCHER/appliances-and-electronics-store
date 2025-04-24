import { useEffect, useState } from 'react';
import DataTransfer from '../DataTransfer';
import FavoriteCard from '../components/FavoriteProductCard.jsx';
import { useProductsMarks } from '../ProductsContext.jsx';

const Favorites = () => {
  const context = useProductsMarks();
  const [favoritesList, setFavoritesList] = useState([]);

  // useEffect(() => {
  //   DataTransfer.getFavorites()
  //     .then(favorites => {
  //       setFavoritesList(favorites);
  //     });
  // }, []);

  useEffect(() => {
    const { favorites } = context;
    setFavoritesList(favorites);
  });

  return (
    <div>
      <h1>Favorites page</h1>
      <div>
        {favoritesList.map(({ id, productId, title, description, price, image, isInCart }) => {
          <FavoriteCard 
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
