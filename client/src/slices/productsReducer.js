import { createSlice } from '@reduxjs/toolkit';
import { productsApi } from './api/productsApi';

const initialState = {
  products: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: (builder) => {
    builder
      .addMatcher(productsApi.endpoints.getProducts.matchFulfilled, (state, { payload }) => {
      })
      .addMatcher(productsApi.endpoints.getProductsByFilter.matchFulfilled, (state, { payload }) => {
        state.products = payload;
      })
  }
});

export default productsSlice.reducer;
