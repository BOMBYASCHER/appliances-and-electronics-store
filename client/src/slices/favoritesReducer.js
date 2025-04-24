import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, { payload: { productId } }) => {
      state.favorites.push(productId);
    },
    removeFavorite: (state, { payload: { productId } }) => {
      state.favorites = state.favorites.filter((id) => id !== productId);
    }
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;