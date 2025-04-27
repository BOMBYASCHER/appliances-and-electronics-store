import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { urls } from '.';

export const favoritesApi = createApi({
  reducerPath: 'favoritesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: urls.data.favorites,
    // prepareHeaders: (headers, { getState }) => {
    //   const token = getStore().authentication.accessToken;
    //   if (token) {
    //     headers.set('Authorization', `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  tagTypes: ['Favorites'],
  endpoints: (builder) => ({
    getFavorites: builder.query({
      query: () => '',
      providesTags: ['Favorites'],
    }),
    addFavorite: builder.mutation({
      query: (product) => ({
        url: '',
        method: 'POST',
        body: product,
        headers: {
          "content-type": "application/json"
        }
      }),
      // invalidatesTags: ['Favorites', 'Products'],
      transformResponse: (response, meta, arg) => ({ data: response, status: meta.response.status }),
      transformErrorResponse: (response, meta, arg) => ({ data: arg, status: meta.response.status }),
    }),
    deleteFavorite: builder.mutation({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
      // invalidatesTags: ['Favorites', 'Products'],
      transformResponse: (response, meta, arg) => ({ data: response, status: meta.response.status }),
      transformErrorResponse: (response, meta, arg) => ({ data: arg, status: meta.response.status }),
    }),
  }),
});

export const {
  useGetFavoritesQuery,
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
} = favoritesApi;
