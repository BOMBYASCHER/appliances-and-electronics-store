export default class DataTransfer {
  static baseUrl = new URL('http://localhost:4040');

  static async getProducts() {
    const requestUrl = new URL('/api/data/products', this.baseUrl);
    return (await fetch(requestUrl)).json();
  }

  static async getProductById(id) {
    const requestUrl = new URL(`/api/data/products/${id}`, this.baseUrl);
    return (await fetch(requestUrl)).json();
  }

  static async getProductsByParamenters(parameters) {
    const requestUrl = new URL('/api/data/products', this.baseUrl);
    requestUrl.search = new URLSearchParams(parameters);
    return (await fetch(requestUrl)).json();
  }

  static async postProductToFavorites(productId) {
    const requestUrl = new URL('/api/data/favorites', this.baseUrl);
    return (await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId })
    }));
  };

  static async postProductToCart(productId) {
    const requestUrl = new URL('/api/data/products', this.baseUrl);
    return (await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productId })
    }));
  };

  static async deleteProductFromFavorites(productId) {
    const requestUrl = new URL('/api/data/favorites', this.baseUrl);
    requestUrl.search = new URLSearchParams({ productId });
    return (await fetch(requestUrl, { method: 'DELETE' }));
  };

  static async deleteProductFromCart(productId) {
    const requestUrl = new URL('/api/data/products', this.baseUrl);
    requestUrl.search = new URLSearchParams({ productId });
    return (await fetch(requestUrl, { method: 'DELETE' }));
  };
}
