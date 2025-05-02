import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { urls } from '.';
// import { getStore } from '..';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: urls.data.cart,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authentication.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => '',
      providesTags: 'Cart',
      transformResponse: (response, meta, arg) => ({ data: response, status: meta.response.status }),
      transformErrorResponse: (response, meta, arg) => ({ data: arg, status: meta.response.status })
    }),
    addProductToCart: builder.mutation({
      query: (product) => ({
        method: 'POST',
        body: product
      }),
      invalidatesTags: ['Cart', 'Products'],
      transformResponse: (response, meta, arg) => ({ data: response, status: meta.response.status }),
      transformErrorResponse: (response, meta, arg) => ({ data: arg, status: meta.response.status })
    }),
    updateProductInCart: builder.mutation({
      query: ({id, quantity}) => ({
        url: id,
        method: 'PUT',
        body: quantity
      }),
      invalidatesTags: ['Cart'],
      transformResponse: (response, meta, arg) => ({ data: response, status: meta.response.status }),
      transformErrorResponse: (response, meta, arg) => ({ data: arg, status: meta.response.status })
    }),
    deleteProductFromCart: builder.mutation({
      query: (product) => ({
        method: 'DELETE',
        body: product
      }),
      invalidatesTags: ['Cart', 'Products'],
      transformResponse: (response, meta, arg) => ({ data: response, status: meta.response.status }),
      transformErrorResponse: (response, meta, arg) => ({ data: arg, status: meta.response.status })
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddProductToCartMutation,
  useUpdateProductInCartMutation,
  useDeleteProductFromCartMutation,
  useLazyGetCartQuery,
} = cartApi;
