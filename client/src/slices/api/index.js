const getUrlOrigin = () => {
  const mode = import.meta.env.APPLICATION_PROFILE;
  const databaseUrl = import.meta.env.DATABASE_URL;
  const baseUrl = mode == undefined ? 'http://localhost:4040' : databaseUrl;
  return new URL(baseUrl);
};

export const urls = {
  auth: new URL('api/auth', getUrlOrigin()),
  data: {
    products: new URL('api/data/products', getUrlOrigin()).toString(),
    favorites: new URL('api/data/favorites', getUrlOrigin()).toString(),
    cart: new URL('api/data/cart', getUrlOrigin()).toString(),
    orders: new URL('api/data/orders', getUrlOrigin()).toString(),
    returns: new URL('api/data/returns', getUrlOrigin()).toString(),
  },
};
