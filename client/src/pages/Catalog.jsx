import Header from '../components/Header.jsx';
import ProductCard from '../components/ProductCard.jsx';
import DataLoader from '../DataLoader.js';
import { useState, useEffect } from 'react';

const Catalog = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    DataLoader.getProducts()
      .then(products => setData(products))
  });

  return (
    <>
      <Header />
      <div>
        <h1>Main page</h1>
        <div>
          {data.map(p => <ProductCard title={p.title} description={p.description} price={p.price} image={p.image}/>)}
        </div>
      </div>
    </>
  )
}

export default Catalog;
