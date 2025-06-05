const getUrlOrigin = () => {
  const baseUrl = import.meta.env.VITE_SERVER_URL;
  return new URL(baseUrl);
};

export const urls = {
  auth: new URL('api/auth', getUrlOrigin()).toString(),
  data: {
    products: new URL('api/data/products', getUrlOrigin()).toString(),
    favorites: new URL('api/data/favorites', getUrlOrigin()).toString(),
    cart: new URL('api/data/cart', getUrlOrigin()).toString(),
    orders: new URL('api/data/orders', getUrlOrigin()).toString(),
    returns: new URL('api/data/returns', getUrlOrigin()).toString(),
  },
};
