import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { urls } from '.';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: urls.data.cart,
    // prepareHeaders: (headers, { getState }) => {
    //   const token = getStore().authentication.accessToken;
    //   if (token) {
    //     headers.set('Authorization', `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => '',
      providesTags: 'Cart',
    }),
    addProductToCart: builder.mutation({
      query: (product) => ({
        method: 'POST',
        body: product
      }),
      invalidatesTags: ['Cart', 'Products'],
    }),
    updateProductInCart: builder.mutation({
      query: ({id, quantity}) => ({
        url: id,
        body: quantity
      }),
      invalidatesTags: ['Cart'],
    }),
    deleteProductFromCart: builder.mutation({
      query: (product) => ({
        method: 'DELETE',
        body: product
      }),
      invalidatesTags: ['Cart', 'Products'],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddProductToCartMutation,
  useUpdateProductInCartMutation,
  useDeleteProductFromCartMutation,
} = cartApi;
