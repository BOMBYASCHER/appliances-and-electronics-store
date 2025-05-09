import { createSlice, isAllOf, isAnyOf } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';
import { PURGE } from 'redux-persist';
import { productsApi } from './api/productsApi';
import { favoritesApi } from './api/favoritesApi';
import { ordersApi } from './api/ordersApi';

const initialState = {
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    // logout: (state) => {
    //   state.user = null;
    //   state.accessToken = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(PURGE, () => {
        console.log('PURGE CASE');
        return initialState;
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload: { data, status } }) => {
        console.log('IN login.matchFulfilled()')
        const { accessToken, fullName } = data;
        state.accessToken = accessToken;
        state.user = fullName;
        console.log('login.matchFulfilled() - accessToken: ' + accessToken);
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state, { payload: { data, status } }) => {
        console.log('IN login.matchRejected()')
        const { accessToken, fullName } = data;
        state.accessToken = accessToken;
        state.user = fullName;
        console.log('login.matchFulfilled() - accessToken: ' + accessToken);
      })
      .addMatcher(authApi.endpoints.registration.matchFulfilled, (state, { payload: { data, status } }) => {
        const { accessToken, fullName } = data;
        state.accessToken = accessToken;
        state.user = fullName;
      })
      // .addMatcher(isAnyOf(
      //   ordersApi.endpoints.getOrders.matchRejected,
      //   ordersApi.endpoints.createOrder.matchRejected,
      // ), (state, { payload: { data, status } }) => {
      //   if (status == 401) {
      //     state.accessToken = null;
      //     state.user = null;
      //   }
      // })
  }
});

// export const { logout } = authSlice.actions;

export default authSlice.reducer;
