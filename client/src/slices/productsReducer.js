import { createSlice } from '@reduxjs/toolkit';
import { productsApi } from './api/productsApi';

const initialState = {
  products: [],
  // sort: (data) => { data },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  // reducers: {
  //   // setSort: (state, { payload: { sort } }) => {
  //   //   state.sort = sort;
  //   // },
  //   // sort: (state, { payload: { sort = (p) => p } }) => {
  //   //   state.products = sort(state.products);
  //   // },
  // },
  extraReducers: (builder) => {
    builder
      .addMatcher(productsApi.endpoints.getProducts.matchFulfilled, (state, { payload }) => {
      })
      .addMatcher(productsApi.endpoints.getProductsByFilter.matchFulfilled, (state, { payload }) => {
        state.products = payload;
      })
  }
});

// export const { setSort } = productsSlice.actions;

export default productsSlice.reducer;
