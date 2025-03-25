import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import Catalog from './pages/Catalog.jsx'
import Favorites from './pages/Favorites.jsx'
import Cart from './pages/Cart.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Catalog />}></Route>
      <Route path='/favorites' element={<Favorites />}></Route>
      <Route path='/cart' element={<Cart />}></Route>
    </Routes>
  </BrowserRouter>
  </StrictMode>
);
