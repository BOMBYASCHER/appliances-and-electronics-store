import Filter from '../components/Filter.jsx';
import FilterObject from '../Filter.js';
import Header from '../components/Header.jsx';
import ProductCard from '../components/ProductCard.jsx';
import Search from '../components/Search.jsx';
import Sort from '../components/Sort.jsx';
import DataTransfer from '../DataTransfer.js';
import { useState, useEffect } from 'react';

const Main = () => {
  const defaultSort = (products) => products;

  const [data, setData] = useState(getData([]));
  const [filter, setFilter] = useState(new FilterObject({}));
  const [productsList, setProductsList] = useState([]);
  const [sort, setSort] = useState(() => defaultSort);

  useEffect(() => {
    DataTransfer.getProducts()
      .then(products => {
        setData(getData(products));
        setProductsList(products);
      });
  }, []);

  useEffect(() => {
    DataTransfer.getProductsByParamenters(filter.toParameters())
      .then(products => {
        const sortedList = sort(products);
        setProductsList(sortedList);
      });
  }, [filter]);

  return (
    <>
      <Header/>
      <div>
        <h1>Main page</h1>
        <Search filter={filter} setFilter={setFilter}></Search>
        <Sort defaultSort={defaultSort} setSort={setSort}></Sort>
        <div>
          <Filter data={data} filter={filter} setFilter={setFilter}></Filter>
          <Catalog products={productsList}/>
        </div>
      </div>
    </>
  )
};

const Catalog = ({ products }) => {
  return (
    <div>
      {products.map(p =>
        <ProductCard
          key={p.id}
          title={p.title}
          description={p.description}
          price={p.price}
          image={p.image}
          isFavorite={p.isFavorite}
          isInCart={p.isInCart}
        />
      )}
    </div>
  );
};

const getData = (data) => {
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
  console.log(`Min: ${minPrice}`)
  console.log(`Max: ${maxPrice}`)

  return {
    brands,
    categories,
    colors,
    releaseYears,
    minPrice,
    maxPrice
  };
};

export default Main;
