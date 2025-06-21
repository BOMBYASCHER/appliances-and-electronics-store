import FilterObject from '../Filter.js';
import Header from '../components/Header.jsx';
import Sort from '../components/Sort.jsx';
import { useState, useEffect } from 'react';
import { useGetProductsByFilterMutation, useGetProductsQuery } from '../slices/api/productsApi.js';
import { useSyncTab } from '../SyncTabHook.js';
import style from './style.css?inline';
import Catalog from '../components/Catalog.jsx';
import Footer from '../components/Footer.jsx';

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
      <style type='text/css'>{style}</style>
      <Header isMainPage={true}/>
      <Sort defaultSort={defaultSort} setSort={setSort}></Sort>
      <Catalog data={metadata} filter={filter} setFilter={setFilter} products={processedProducts} limit={limit} setLimit={setLimit}/>
      <Footer/>
    </>
  )
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
