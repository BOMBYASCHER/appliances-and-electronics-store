import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import Main from './pages/Main.jsx'
import Favorites from './pages/Favorites.jsx'
import Cart from './pages/Cart.jsx'
import ProductsProvider from './ProductsContext.jsx';
import ModeProvider from './ApplicationMode.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
  <ModeProvider>
    <ProductsProvider>
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/favorites' element={<Favorites />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
      </Routes>
    </ProductsProvider>
  </ModeProvider>
  </BrowserRouter>
  </StrictMode>
);
