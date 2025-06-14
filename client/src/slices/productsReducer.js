import { createSlice } from '@reduxjs/toolkit';
import { productsApi } from './api/productsApi';

const initialState = {
  products: [],
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    loadProducts: (state, { payload: products } ) => {
      state.products.push(...products);
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(productsApi.endpoints.getProducts.matchFulfilled, (state, { payload }) => {
        console.log('getProducts.matchFulfilled() : ')
        state.products = payload;
      })
      .addMatcher(productsApi.endpoints.getProductsByFilter.matchFulfilled, (state, { payload }) => {
        console.log('getProductsByFilter.matchFulfilled() : ')
        state.products = payload;
      })
  }
});

export const { loadProducts } = productsSlice.actions;
export default productsSlice.reducer;
