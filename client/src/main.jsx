import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import Main from './pages/Main.jsx'
import Favorites from './pages/Favorites.jsx'
import Cart from './pages/Cart.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Main />}></Route>
      <Route path='/favorites' element={<Favorites />}></Route>
      <Route path='/cart' element={<Cart />}></Route>
    </Routes>
  </BrowserRouter>
  </StrictMode>
);
