import { createSlice, isAllOf } from '@reduxjs/toolkit';
import { favoritesApi } from './api/favoritesApi';
import { productsApi } from './api/productsApi';


const initialState = {
  favorites: []
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  // reducers: {
  //   addFavorite: (state, { payload: { productId } }) => {
  //     state.favorites.push(productId);
  //   },
  //   removeFavorite: (state, { payload: { productId } }) => {
  //     state.favorites = state.favorites.filter((id) => id !== productId);
  //   }
  // },
  extraReducers: (builder) => {
    builder
      .addMatcher(favoritesApi.endpoints.getFavorites.matchFulfilled, (state, { data }) => {
        // data.forEach(({ id, productId, title, description, price, image, isInCart }) => {
        //   state.favorites.push({ id, productId, title, description, price, image, isInCart });
        // });
        data.forEach(({ productId }) => {
          state.favorites.push(productId);
        });
      })
      .addMatcher(favoritesApi.endpoints.addFavorite.matchFulfilled, (state, { data, status }) => {
        if (status == 401) {
          const { productId } = data;
          
          state.favorites.push(productId);
        }
      })
      .addMatcher(favoritesApi.endpoints.deleteFavorite.matchFulfilled, (state, { payload }) => {
        const { productId } = payload;
        state.favorites = state.favorites.filter((id) => id !== productId);
        
      })
      .addMatcher(favoritesApi.endpoints.addFavorite.matchRejected, (state, { payload }) => {
        const { data: productId } = payload;
        state.favorites.push(productId);
        console.log('(Unauth) ProductId: ' + productId)
        console.log('(Unauth) Add to favorites: ' + productId)
      })
      .addMatcher(favoritesApi.endpoints.deleteFavorite.matchRejected, (state, { payload }) => {
        const { productId } = payload;
        state.favorites.push(productId);
        console.log('(Unauth) ProductId: ' + productId)
        console.log('(Unauth) Delete from favorites: ' + productId)
      })
  }
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;