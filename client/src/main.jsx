import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import Main from './pages/Main.jsx'
import Favorites from './pages/Favorites.jsx'
import Cart from './pages/Cart.jsx'

import { Provider } from 'react-redux';
import store, { persistor } from './slices/index.js';
import AuthenticatedRoute from './AuthenticatedRoute.jsx';
import Orders from './pages/Orders.jsx';
import Returns from './pages/Returns.jsx';
import Login from './pages/Login.jsx';
import { PersistGate } from 'redux-persist/integration/react';
import Registration from './pages/Registration.jsx';


createRoot(document.getElementById('root')).render(
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
      </Routes>
      </PersistGate>
    </Provider>
  </BrowserRouter>
  </StrictMode>
);
