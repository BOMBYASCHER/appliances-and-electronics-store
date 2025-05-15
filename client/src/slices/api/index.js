const getUrlOrigin = () => {
  console.log('import.meta.env.MODE : ' + import.meta.env.MODE);
  const mode = import.meta.env.VITE_APPLICATION_PROFILE;
  // const serverUrl = import.meta.env.VITE_SERVER_URL;
  const serverUrl = 'https://maconi-store-server.onrender.com';
  console.log('VITE_APPLICATION_PROFILE: ' + mode);
  console.log('VITE_SERVER_URL' + serverUrl);
  const baseUrl = mode === 'production' ? serverUrl : 'http://localhost:4040';
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
