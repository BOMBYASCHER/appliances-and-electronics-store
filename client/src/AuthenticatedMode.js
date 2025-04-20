import DataTransfer from "./DataTransfer";

export default class Authenticated {
  static addToCart(productId) {
    DataTransfer.postProductToCart(productId);
  }

  static addToFavorites(productId) {
    DataTransfer.postProductToFavorites(productId);
  }

  static deleteFromCart(productId) {
    DataTransfer.deleteProductFromCart(productId);
  }

  static deleteFromFavorites(productId) {
    DataTransfer.deleteProductFromFavorites(productId);
  }
};