import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
import { ordersApi } from './api/ordersApi';

const initialState = {
  orders: []
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(PURGE, () => {
        console.log('ordersReducer() - PURGE CASE');
        return initialState;
      })
      .addMatcher(ordersApi.endpoints.getOrders.matchFulfilled, (state, { payload: { data, status } }) => {
        console.log(data)
        state.orders = data;
      })
      .addMatcher(ordersApi.endpoints.getOrders.matchRejected, (state, { payload: { data, status } }) => {
        
      })
      .addMatcher(ordersApi.endpoints.createOrder.matchFulfilled, (state, { payload: { data, status } }) => {
        console.log('createOrder.matchFulfilled()')
      })
      .addMatcher(ordersApi.endpoints.createOrder.matchRejected, (state, { payload: { data, status } }) => {
        console.log('createOrder.matchRejected()')
        console.log(data)
      })
  }
});

// export const {  } = ordersSlice.actions;

export default ordersSlice.reducer;
