import { createContext, useContext, useReducer } from 'react';

export const ProductsContext = createContext(null);
export const ProductsDispatchContext = createContext(null);

const ProductsProvider = ({ children }) => {
  const initialProductsMarks = {
    favorites: [],
    cart: []
  };
  
  const [productsMarks, dispatch] = useReducer(
    productsReducer,
    initialProductsMarks
  );

  return (
    <ProductsContext.Provider value={productsMarks}>
      <ProductsDispatchContext.Provider value={dispatch}>
        {children}
      </ProductsDispatchContext.Provider>
    </ProductsContext.Provider>
  );
}

export function useProductsMarks() {
  return useContext(ProductsContext);
}

export function useProductsDispatch() {
  return useContext(ProductsDispatchContext);
}

function productsReducer(productsMarks, action) {
  const { type, productId } = action;
  const { favorites, cart } = productsMarks;
  switch (type) {
    case 'ADD_TO_FAVORITES': {
      return { cart, favorites: [...favorites, productId]};
    }
    case 'ADD_TO_CART': {
      return { favorites, cart: [...cart, productId]};
    }
    case 'DELETE_FROM_FAVORITES': {
      return { cart, favorites: favorites.filter(id => id !== productId)};
    }
    case 'DELETE_FROM_CART': {
      return { favorites, cart: cart.filter(id => id !== productId)};
    }
    default: {
      throw Error('Unknown action: ' + type);
    }
  }
}



export const addToFavorite = (productId) => {
  return { type: 'ADD_TO_FAVORITES', productId }
};
export const addToCart = (productId) => {
  return { type: 'ADD_TO_CART', productId }
};
export const deleteFromFavorite = (productId) => {
  return { type: 'DELETE_FROM_FAVORITES', productId }
};
export const deleteFromCart = (productId) => {
  return { type: 'DELETE_FROM_CART', productId }
};

export default ProductsProvider;
