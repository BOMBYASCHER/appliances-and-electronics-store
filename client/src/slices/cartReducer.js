import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalAmount: 0, 
  products: {},
  productIds: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart: (state, { payload: { productId } }) => {
      state.products[productId] = { quantity: 1 };
      state.productIds.push(productId);
    },
    changeProductQuantity: (state, { payload: { productId, quantity } }) => {
      state.elements[productId] = { quantity: quantity > 0 ? quantity : 1 };
    },
    removeProductFromCart: (state, { payload: { productId } }) => {
      delete state.products[productId];
      state.productIds = state.productIds.filter((id) => id !== productId);
    },
  },
});

export const { addProductToCart, changeProductQuantity, removeProductFromCart } = cartSlice.actions;

export default cartSlice.reducer;