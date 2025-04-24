import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer.js';
import favoritesReducer from './favoritesReducer.js';
import cartReducer from './cartReducer.js';
import { productsApi } from './api/productsApi.js';
import { favoritesApi } from './api/favoritesApi.js';
import { cartApi } from './api/cartApi.js';
import { authApi } from './api/authApi.js';

const store = configureStore({
  reducer: {
    authentication: authReducer, 
    favorites: favoritesReducer,
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(
      productsApi.middleware,
      favoritesApi.middleware,
      cartApi.middleware,
      authApi.middleware,
    ),
});

export default store;
export const getStore = () => store.getState();
