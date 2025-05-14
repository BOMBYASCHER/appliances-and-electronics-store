const getUrlOrigin = () => {
  const mode = import.meta.env.CLIENT_APPLICATION_PROFILE;
  const serverUrl = import.meta.env.SERVER_URL;
  const baseUrl = mode === 'production' ? 'http://localhost:4040' : serverUrl;
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
