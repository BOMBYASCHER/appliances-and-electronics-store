import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getStore } from '../index.js';

export const favoritesApi = createApi({
  reducerPath: 'favoritesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4040/api/data/favorites',
    prepareHeaders: (headers, { getState }) => {
      const token = getStore().authentication.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Favorites'],
  endpoints: (builder) => ({
    getFavorites: builder.query({
      query: () => '',
      providesTags: ['Favorites'],
    }),
    addFavorite: builder.mutation({
      query: (product) => ({
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Favorites', 'Products'],
    }),
    deleteFavorite: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      }),
      invalidatesTags: ['Favorites', 'Products'],
    }),
  }),
});

export const {
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
} = favoritesApi;
