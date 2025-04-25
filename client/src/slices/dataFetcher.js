import { useGetProductsByFilterMutation, useGetProductsQuery } from '../slices/applicationApi.js';

const DataFetcher = () => {
  const { data = [] } = useGetProductsQuery();
  
};

export default DataFetcher;
