import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4040/api/data/products' }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '',
      providesTags: ['Products'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        console.log('Fetching products...');
        try {
          const { data } = await queryFulfilled;
          console.log('Add products to favorites...');
          data.forEach(({ id, isFavorite }) => {
            if (isFavorite) {
              dispatch(addFavorite(id));
            } else if (!isFavorite) {
              dispatch(removeFavorite(id));
            }
          });
        } catch (err) {
          console.error(err);
        }
      }
    }),
    getProductsByFilter: builder.mutation({
      query: (filter) => ({
          url: '',
          params: new URLSearchParams(filter),
        }),
    }),
    getProductById: builder.query({
      query: (id) => id,
      onCacheEntryAdded
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByFilterMutation,
} = productsApi;
