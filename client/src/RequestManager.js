import { Anonimous, Authenticated } from "./ApplicationMode";

export default class RequestManager {
  constructor(classMode = Anonimous) {
    this.mode = classMode;
  }

  addToCart(productId) {
    if (this.mode instanceof Anonimous) {
      Anonimous.addToCart(productId);
    } else if (this.mode instanceof Authenticated) {
      Authenticated.addToCart(productId);
    }
  }

  addToFavorites(productId) {
    if (this.mode instanceof Anonimous) {
      Anonimous.addToFavorites(productId);
    } else if (this.mode instanceof Authenticated) {
      Authenticated.addToFavorites(productId);
    }
  }

  deleteFromCart(productId) {
    if (this.mode instanceof Anonimous) {
      Anonimous.deleteFromCart(productId);
    } else if (this.mode instanceof Authenticated) {
      Authenticated.deleteFromCart(productId);
    }
  }

  deleteFromFavorites(productId) {
    if (this.mode instanceof Anonimous) {
      Anonimous.deleteFromFavorites(productId);
    } else if (this.mode instanceof Authenticated) {
      Authenticated.deleteFromFavorites(productId);
    }
  }
};
