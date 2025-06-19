import Filter from '../components/Filter.jsx';
import FilterObject from '../Filter.js';
import Header from '../components/Header.jsx';
import ProductCard from '../components/ProductCard.jsx';
import Sort from '../components/Sort.jsx';
import { useState, useEffect } from 'react';
import { useGetProductsByFilterMutation, useGetProductsQuery } from '../slices/api/productsApi.js';
import { useSelector } from 'react-redux';
import { useSyncTab } from '../SyncTabHook.js';
import '../assets/style/style.css';

const Main = () => {
  useSyncTab();
  const [limit, setLimit] = useState(9);
  const defaultSort = (data) => data;
  const { data } = useGetProductsQuery();
  const metadata = getMetadata(data);
  const [filter, setFilter] = useState(new FilterObject({}));
  const [getProductsByFilter, { data: filteredProducts }] = useGetProductsByFilterMutation();
  const [sort, setSort] = useState(() => defaultSort);

  useEffect(() => { 
    setLimit(9);
  }, [filter]);

  useEffect(() => { 
    getProductsByFilter({ filter: filter.toParameters(), limit });
  }, [filter, getProductsByFilter, limit]);

  const productsToShow = Object.keys(filter).length === 0 ? data : filteredProducts;
  const processedProducts = sort(productsToShow);

  return (
    <>
      <Header isMainPage={true}/>
      <Sort defaultSort={defaultSort} setSort={setSort}></Sort>
      <Filter data={metadata} filter={filter} setFilter={setFilter}></Filter>
      <Catalog products={processedProducts} limit={limit} setLimit={setLimit}/>
    </>
  )
};

const Catalog = ({ products = [], limit, setLimit }) => {
  const { favorites } = useSelector((state) => state.favorites);
  const { products: productsInCart } = useSelector((state) => state.cart);

  const syncedProducts = products.map(product => {
    const isFavorite = product.isFavorite ? true : favorites.find(({ productId }) => productId == product.id) !== undefined;
    const isInCart = product.isInCart ? true : productsInCart.find(({ productId }) => productId == product.id) !== undefined;
    return { ...product, isFavorite, isInCart }
  });
  const btnIsHidden = products.length < limit;
  return (
    <main className='product-list'>
        {syncedProducts.map(p =>  {
          return (<ProductCard
            key={p.id}
            id={p.id}
            title={p.title}
            description={p.description}
            price={p.price}
            image={p.image}
            isFavorite={p.isFavorite}
            isInCart={p.isInCart}
          />)
        }
        )}
      <div className='d-flex justify-content-center row row-cols-3 py-5'>
        <button hidden={btnIsHidden} className='btn btn-primary' onClick={() => setLimit(limit + 9)}>Показать больше</button>
      </div>
    </main>
  );
};

const getMetadata = (data = []) => {
  if (data.length == 0) {
    return {
      brands: [],
      categories: [],
      colors: [],
      releaseYears: [],
      minPrice: null,
      maxPrice: null,
    }
  }
  const brands = [...new Set(
    data.map(({ brand }) => brand)
  )];
  const categories = [...new Set(
    data.map(({ category }) => category)
  )];
  const colors = [...new Set(
    data.map(({ color }) => color)
  )];
  const releaseYears = [...new Set(
    data.map(({ releaseDate }) => new Date(releaseDate).getFullYear())
  )];
  const prices = data.map(({ price }) => price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  return {
    brands,
    categories,
    colors,
    releaseYears,
    minPrice,
    maxPrice,
  };
};

export default Main;
