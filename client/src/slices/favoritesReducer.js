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
        if (status == 200) {
          console.log('getFavorites.matchFulfilled() - start');
          state.favorites = data;
          console.log('getFavorites.matchFulfilled() - success');
        }
      })
      .addMatcher(favoritesApi.endpoints.getFavorites.matchRejected, (state, { payload: { data, status } }) => {
        if (status == 401) {
          state.favorites = state.favorites;
        }
      })
      .addMatcher(favoritesApi.endpoints.addFavorite.matchFulfilled, (state, { data, status }) => {

      })
      .addMatcher(favoritesApi.endpoints.deleteFavorite.matchFulfilled, (state, { payload }) => {
        const { productId } = payload;
        state.favorites = state.favorites.filter((id) => id !== productId);
      })
      .addMatcher(favoritesApi.endpoints.addFavorite.matchRejected, (state, { payload: { data: favorite, status } }) => {
        if (status == 401) {
          console.log('addFavorite.matchRejected() : Data - ')
          console.log(favorite)
          state.favorites.push(favorite);
        }
      })
      .addMatcher(favoritesApi.endpoints.deleteFavorite.matchRejected, (state, { payload: { data: id, status } }) => {
        if (status == 401) {
          console.log('deleteFavorite.matchRejected() : Data - ')
          console.log(id)
          state.favorites = state.favorites.filter((favorite) => favorite.productId !== id);
        }
      })
  }
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
