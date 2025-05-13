import { createSlice } from '@reduxjs/toolkit';
import { cartApi } from './api/cartApi';
import { PURGE } from 'redux-persist';

const initialState = {
  totalAmount: 0, 
  products: [],
};

const calculateTotalAmount = (products = []) => {
  return products.reduce((acc, { price, quantity }) => acc + price * quantity, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  extraReducers: (builder) => builder
    .addCase(PURGE, () => {
      console.log('cartReducer() - PURGE CASE');
      return initialState;
    })
    .addMatcher(cartApi.endpoints.getCart.matchFulfilled, (state, { payload: { data, status } }) => {
      if (status == 200) {
        console.log('getCart.matchFulfilled() - start');
        const { totalAmount, elements } = data;
        state.totalAmount = totalAmount;
        state.products = elements;
        console.log('getCart.matchFulfilled() - success');
      }
    })
    .addMatcher(cartApi.endpoints.getCart.matchRejected, (state, { payload: { data, status } }) => {
      if (status = 401) {
        state.totalAmount = calculateTotalAmount(state.products);
        state.products = state.products;
      }
    })
    .addMatcher(cartApi.endpoints.addProductToCart.matchFulfilled, (state, { payload: { data, status } }) => {
      if (status == 201) {
        console.log('addProductToCart.matchFulfilled() : Data - ');
        const { productId } = data;
        state.products.push({ productId });
      }
    })
    .addMatcher(cartApi.endpoints.addProductToCart.matchRejected, (state, { payload: { data, status } }) => {
      if (status == 401) {
        const { productId, title, price, image } = data;
        state.products.push({ productId, title, price, image, quantity: 1 });
        state.totalAmount = calculateTotalAmount(state.products);
      }
    })
    .addMatcher(cartApi.endpoints.deleteProductFromCart.matchFulfilled, (state, { payload: { data: id, status } }) => {
      console.log('deleteProductFromCart.matchFulfilled()')
      console.log('status: ' + status)
      if (status == 204) {
        console.log('deleteProductFromCart.matchFulfilled()')
        state.products = state.products.filter(({ productId }) => productId !== id);
        state.totalAmount = calculateTotalAmount(state.products);
      }
    })
    .addMatcher(cartApi.endpoints.deleteProductFromCart.matchRejected, (state, { payload: { data: id, status } }) => {
      console.log('deleteProductFromCart.matchRejected()')
      if (status == 401) {
        state.products = state.products.filter(({ productId }) => productId !== id);
        state.totalAmount = calculateTotalAmount(state.products);
      }
    })
    .addMatcher(cartApi.endpoints.updateProductInCart.matchFulfilled, (state, { payload: { data, status } }) => {
      if (status == 200) {
        state.products.find(({ productId }) => productId == data.productId).quantity = data.quantity;
        state.totalAmount = calculateTotalAmount(state.products);
      }
    })
    .addMatcher(cartApi.endpoints.updateProductInCart.matchRejected, (state, { payload: { data, status } }) => {
      if (status == 401) {
        state.products.find(({ productId }) => productId == data.productId).quantity = data.quantity;
        state.totalAmount = calculateTotalAmount(state.products);
      }
    })
});

export default cartSlice.reducer;
