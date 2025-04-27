import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer.js';
import productsReducer from './productsReducer.js';
import favoritesReducer from './favoritesReducer.js';
import cartReducer from './cartReducer.js';
import { productsApi } from './api/productsApi.js';
import { favoritesApi } from './api/favoritesApi.js';
import { cartApi } from './api/cartApi.js';
import { authApi } from './api/authApi.js';

const store = configureStore({
  reducer: {
    authentication: authReducer,
    products: productsReducer,
    favorites: favoritesReducer,
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(
      authApi.middleware,
      productsApi.middleware,
      favoritesApi.middleware,
      cartApi.middleware,
    ),
});

export default store;
export const getStore = () => store.getState();
