import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import Main from './pages/Main.js'
import Favorites from './pages/Favorites.js'
import Cart from './pages/Cart.js'

import { Provider } from 'react-redux';
import store, { persistor } from './slices/index.js';
import AuthenticatedRoute from './AuthenticatedRoute.js';
import Orders from './pages/Orders.js';
import Returns from './pages/Returns.js';
import Login from './pages/Login.js';
import { PersistGate } from 'redux-persist/integration/react';
import Registration from './pages/Registration.js';
import ReturnForm from './pages/ReturnForm.js';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login /> } />
        <Route path='/registration' element={<Registration /> } />
        <Route path='/orders' element={<AuthenticatedRoute element={<Orders />} />}/>
        <Route path='/returns' element={<AuthenticatedRoute element={<Returns />} />}/>
        <Route path='/return-form' element={<AuthenticatedRoute element={<ReturnForm/>} />}/>
      </Routes>
      </PersistGate>
    </Provider>
  </BrowserRouter>
  </StrictMode>
);
