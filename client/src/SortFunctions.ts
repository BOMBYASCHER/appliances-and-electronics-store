export const sortByPriceAsc = (data = []) => {
  const products = [...data];
  return products.sort((a, b) => a.price - b.price);
};

export const sortByPriceDesc = (data = []) => {
  const products = [...data];
  return products.sort((a, b) => b.price - a.price);
};

export const sortByNameAsc = (data = []) => {
  const products = [...data];
  return products.sort((a, b) => a.title.localeCompare(b.title));
};

export const sortByNameDesc = (data = []) => {
  const products = [...data];
  return products.sort((a, b) => b.title.localeCompare(a.title));
};

export const sortByReleaseDateAsc = (data = []) => {
  const products = [...data];
  return products.sort((a, b) => {
    const dateA = new Date(a.releaseDate);
    const dateB = new Date(b.releaseDate);
    return dateA.valueOf() - dateB.valueOf();
  });
};

export const sortByReleaseDateDesc = (data = []) => {
  const products = [...data];
  return products.sort((a, b) => {
    const dateA = new Date(a.releaseDate);
    const dateB = new Date(b.releaseDate);
    return dateB.valueOf() - dateA.valueOf();
  });
};
