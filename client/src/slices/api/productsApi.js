import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { urls } from '.';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: urls.data.products,
  }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: '',
        params: { limit: 1000 },
      }),
      providesTags: ['Products'],
      transformResponse: (response, meta, arg) => response,
    }),
    getProductsByFilter: builder.mutation({
      query: ({ filter, limit }) => ({
        url: '',
        params: { ...filter, limit },
      }),
      transformResponse: (response, meta, arg) => response,
      invalidatesTags: ['Products'],
    }),
    getProductsMetadata: builder.query({
      query: () => '',
      transformResponse: (response, meta, arg) => getMetadata(response),
    }),
    getProductById: builder.mutation({
      query: ({ id }) => ({
        url: `${id}`,
      }),
      transformResponse: (response, meta, arg) => response,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByFilterMutation,
  useGetProductsMetadataQuery,
  useGetProductByIdMutation,
  useLazyGetProductsQuery,
} = productsApi;

const getMetadata = (data = []) => {
  console.log(data)
  if (data === undefined || data.length === 0) {
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
    maxPrice
  };
};
