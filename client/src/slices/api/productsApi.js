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
      query: () => '',
      // query: () => '?brands=LG',
      providesTags: ['Products'],
      transformResponse: (response, meta, arg) => response,
      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   console.log('Fetching products...');
      //   try {
      //     const { data } = await queryFulfilled;
      //     console.log('Add products to favorites...');
      //     data.forEach(({ id, isFavorite }) => {
      //       if (isFavorite) {
      //         dispatch(addFavorite(id));
      //       } else if (!isFavorite) {
      //         dispatch(removeFavorite(id));
      //       }
      //     });
      //   } catch (err) {
      //     console.error(err);
      //   }
      // }
    }),
    getProductsByFilter: builder.mutation({
      query: (filter) => ({
        url: '',
        params: filter,
      }),
      transformResponse: (response, meta, arg) => response,
      invalidatesTags: ['Products'],
    }),
    getProductsMetadata: builder.query({
      query: () => '',
      transformResponse: (response, meta, arg) => getMetadata(response),
    }),
    getProductById: builder.mutation({
      query: (id) => ({
        url: `${id}`,
      }),
      transformResponse: (response, meta, arg) => {
        // const { data } = response;
        // return data;
        return response
      }
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByFilterMutation,
  useGetProductsMetadataQuery,
  useGetProductByIdMutation,
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