import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './authReducer.js';
import productsReducer from './productsReducer.js';
import favoritesReducer from './favoritesReducer.js';
import cartReducer from './cartReducer.js';
import { productsApi } from './api/productsApi.js';
import { favoritesApi } from './api/favoritesApi.js';
import { cartApi } from './api/cartApi.js';
import { authApi } from './api/authApi.js';
import { ordersApi } from './api/ordersApi.js';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: [
    authApi.reducerPath,
    productsApi.reducerPath,
    favoritesApi.reducerPath,
    cartApi.reducerPath,
    ordersApi.reducerPath,
  ],
};

const rootReducer = combineReducers({
  authentication: authReducer,
  products: productsReducer,
  favorites: favoritesReducer,
  cart: cartReducer,
  [authApi.reducerPath]: authApi.reducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [favoritesApi.reducerPath]: favoritesApi.reducer,
  [cartApi.reducerPath]: cartApi.reducer,
  [ordersApi.reducerPath]: ordersApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    }).concat(
      authApi.middleware,
      productsApi.middleware,
      favoritesApi.middleware,
      cartApi.middleware,
      ordersApi.middleware,
    ),
});

export default store;
export const persistor = persistStore(store);
export const getStore = () => store.getState();

export const logout = () => {
  persistor.purge();
};
