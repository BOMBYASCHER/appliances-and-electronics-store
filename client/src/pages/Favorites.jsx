import FavoriteCard from '../components/FavoriteProductCard.jsx';
import { useSelector } from 'react-redux';
import Header from '../components/Header.jsx';
import { useGetFavoritesQuery } from '../slices/api/favoritesApi.js';
import { getCart, getFavorites } from '../stateSelectors.js';
import { useSyncTab } from '../SyncTabHook.js';
import { Link } from 'react-router';
import style from '../assets/style/Favorites.css?inline';
import Footer from '../components/Footer.jsx';

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
      <style type='text/css'>{style}</style>
      <Header/>
      <div className='container'>
        <h1>Избранные Товары</h1>
        {
          syncedFavorites.length == 0 ?
          <EmptyHero/> :
          <>
          <table>
            <thead>
                <tr>
                    <th>Изображение</th>
                    <th>Наименование</th>
                    <th>Описание</th>
                    <th>Цена</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
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
            </tbody>
          </table>
          </>
        }
      </div>
      <Footer/>
    </>
  );
};

const EmptyHero = () => {
  return (
    <></>
    // <div class="px-4 py-5 my-5 text-center">
    //   <h1 class="display-5 fw-bold">В избранном ничего нет.</h1>
    //   <div class="col-lg-6 mx-auto">
    //   <p class="lead mb-4">
    //     Вы ещё не добавили ни одного товара в избранное. Может посмотреть каталог?
    //   </p>
    //   <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
    //     <Link to='/'>
    //       <button type="button" class="btn btn-primary btn-lg px-4 gap-3">Каталог</button>
    //     </Link>
    //   </div>
    //   </div>
    // </div>
  );
};

export default Favorites;
