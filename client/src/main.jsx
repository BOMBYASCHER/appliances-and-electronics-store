import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import Main from './pages/Main.jsx'
import Favorites from './pages/Favorites.jsx'
import Cart from './pages/Cart.jsx'

import { Provider } from 'react-redux';
import store from './slices/index.js';


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/favorites' element={<Favorites />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
      </Routes>
    </Provider>
  </BrowserRouter>
  </StrictMode>
);
