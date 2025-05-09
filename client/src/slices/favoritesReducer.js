import { createSlice } from '@reduxjs/toolkit';
import { favoritesApi } from './api/favoritesApi';
import { PURGE } from 'redux-persist';

const initialState = {
  favorites: []
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(PURGE, () => {
        console.log('favoritesReducer() - PURGE CASE');
        return initialState;
      })
      .addMatcher(favoritesApi.endpoints.getFavorites.matchFulfilled, (state, { payload: { data, status } }) => {
        console.log('getFavorites.matchFulfilled() - start');
        if (status == 200) {
          state.favorites = data;
          console.log('getFavorites.matchFulfilled() - success');
        }
      })
      .addMatcher(favoritesApi.endpoints.getFavorites.matchRejected, (state, { payload: { data, status } }) => {
        console.log('getFavorites.matchRejected() - TOP')
        console.log('getFavorites.matchRejected() - Status object:')
        console.log(status)
        if (status == 401) {
          console.log('getFavorites.matchRejected() - Code 401')
          state.favorites = [...state.favorites];
        }
      })
      .addMatcher(favoritesApi.endpoints.addFavorite.matchFulfilled, (state, { payload: { data: favorite, status } }) => {
        if (status == 201) {
          console.log('addFavorite.matchFulfilled() - favId: ' + favorite.productId)
          state.favorites.push(favorite);
        }
      })
      .addMatcher(favoritesApi.endpoints.addFavorite.matchRejected, (state, { payload: { data: favorite, status } }) => {
        if (status == 401) {
          console.log('addFavorite.matchRejected() : Data - ')
          state.favorites.push(favorite);
        }
      })
      .addMatcher(favoritesApi.endpoints.deleteFavorite.matchFulfilled, (state, { payload: { data: id, status } }) => {
        if (status == 201) {
          console.log('deleteFavorite.matchFulfilled() : Data - ' + id)
          state.favorites = state.favorites.filter((favorite) => favorite.productId !== id);
        }
      })
      .addMatcher(favoritesApi.endpoints.deleteFavorite.matchRejected, (state, { payload: { data: id, status } }) => {
        if (status == 401) {
          console.log('deleteFavorite.matchRejected() : Data - ')
          state.favorites = state.favorites.filter((favorite) => favorite.productId !== id);
        }
      })
  }
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
