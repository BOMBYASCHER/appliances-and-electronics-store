import DataTransfer from './DataTransfer.js';

export default function Authenticated() {
  return {
    addToCart: (productId) => DataTransfer.postProductToCart(productId),

    addToFavorites: (productId) => DataTransfer.postProductToFavorites(productId),

    deleteFromCart: (productId) => DataTransfer.deleteProductFromCart(productId),

    deleteFromFavorites: (productId) => DataTransfer.deleteProductFromFavorites(productId)
  }
};