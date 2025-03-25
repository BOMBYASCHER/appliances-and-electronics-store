export default class DataLoader {
  static async getProducts() {
    const res = await fetch('https://fakestoreapi.com/products');
    const products = await res.json();
    return products;
  }

  static async getProductById(id) {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await res.json();
    return product;
  }
}