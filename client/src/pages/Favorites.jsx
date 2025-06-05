import FavoriteCard from '../components/FavoriteProductCard.jsx';
import { useSelector } from 'react-redux';
import Header from '../components/Header.jsx';
import { useGetFavoritesQuery } from '../slices/api/favoritesApi.js';
import { getCart, getFavorites } from '../stateSelectors.js';
import { useSyncTab } from '../SyncTabHook.js';
import { Link } from 'react-router';

const Favorites = () => {
  useSyncTab();
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
        {
          syncedFavorites.length == 0 ?
          <EmptyHero/> :
          <>
          <h1 className='pb-4'>Your favorites</h1>
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
          </>
        }
      </div> 
    </>
  );
};

const EmptyHero = () => {
  return (
    <div class="px-4 py-5 my-5 text-center">
      <h1 class="display-5 fw-bold">The favorites is empty.</h1>
      <div class="col-lg-6 mx-auto">
      <p class="lead mb-4">
        You haven't added any products to your favorites yet. Maybe take a look at the catalog?
      </p>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <Link to='/'>
          <button type="button" class="btn btn-primary btn-lg px-4 gap-3">Catalog</button>
        </Link>
      </div>
      </div>
    </div>
  );
};

export default Favorites;
