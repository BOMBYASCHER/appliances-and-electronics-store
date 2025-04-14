export default class DataTransfer {
  static baseUrl = new URL('http://localhost:4040');

  static async getProducts() {
    const requestUrl = new URL('/api/data/products', this.baseUrl);
    // const response = await fetch(requestUrl);
    // const products = await response.json();
    // return products;
    return (await fetch(requestUrl)).json();
  }

  static async getProductById(id) {
    const requestUrl = new URL(`/api/data/products/${id}`, this.baseUrl);
    const response = await fetch(requestUrl);
    const product = await response.json();
    return product;
  }

  static async getProductsByParamenters(parameters) {
    const requestUrl = new URL('/api/data/products', this.baseUrl);
    requestUrl.search = new URLSearchParams(parameters);
    const response = await fetch(requestUrl);
    const products = await response.json();
    return products;
  }
}
