import { createSlice } from '@reduxjs/toolkit';
import { authApi } from './api/authApi';

const initialState = {
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setCredentials: (state, { payload: { user, token } }) => {
      state.user = user;
      state.accessToken = token;
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
        const { accessToken, fullName } = payload;
        state.accessToken = accessToken;
        state.user = fullName;
      })
      .addMatcher(authApi.endpoints.registration.matchFulfilled, (state, { payload }) => {
        const { accessToken, fullName } = payload;
        state.accessToken = accessToken;
        state.user = fullName;
      })
  }
});

export const { setCredentials } = authSlice.actions;

export const selectCurrentUser = (state) => state.authentication.user
export default authSlice.reducer;
