import { createSlice } from '@reduxjs/toolkit';
import { cartApi } from './api/cartApi';

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
  // reducers: {
  //   addProductToCart: (state, { payload: { productId } }) => {
  //     state.products[productId] = { quantity: 1 };
  //     state.productIds.push(productId);
  //   },
  //   changeProductQuantity: (state, { payload: { productId, quantity } }) => {
  //     state.elements[productId] = { quantity: quantity > 0 ? quantity : 1 };
  //   },
  //   removeProductFromCart: (state, { payload: { productId } }) => {
  //     delete state.products[productId];
  //     state.productIds = state.productIds.filter((id) => id !== productId);
  //   },
  // },
  extraReducers: (builder) => builder
    .addMatcher(cartApi.endpoints.getCart.matchFulfilled, (state, { payload: { data, status } }) => {
      const { totalAmount, elements } = data;
      state.totalAmount = totalAmount;
      state.products = elements;
    })
    .addMatcher(cartApi.endpoints.getCart.matchRejected, (state, { payload: { data, status } }) => {
      if (status = 401) {
        state.totalAmount = state.totalAmount;
        state.products = state.products;
      }
    })
    .addMatcher(cartApi.endpoints.addProductToCart.matchFulfilled, (state, { payload: { data: product, status } }) => {
      state.products.push(product);
    })
    .addMatcher(cartApi.endpoints.addProductToCart.matchRejected, (state, { payload: { data, status } }) => {
      if (status == 401) {
        const { productId, title, price, image } = data;
        state.products.push({ productId, title, price, image, quantity: 1 });
      }
    })
    .addMatcher(cartApi.endpoints.deleteProductFromCart.matchFulfilled, (state, { payload: { data, status } }) => {
      state.products = state.products.filter(({ productId }) => productId !== data.id);
    })
    .addMatcher(cartApi.endpoints.deleteProductFromCart.matchRejected, (state, { payload: { data, status } }) => {
      if (status == 401) {
        state.products = state.products.filter(({ productId }) => productId !== data.id);
      }
    })
    .addMatcher(cartApi.endpoints.updateProductInCart.matchFulfilled, (state, { payload: { data, status } }) => {})
    .addMatcher(cartApi.endpoints.updateProductInCart.matchRejected, (state, { payload: { data, status } }) => {})
});

export const { addProductToCart, changeProductQuantity, removeProductFromCart } = cartSlice.actions;

export default cartSlice.reducer;