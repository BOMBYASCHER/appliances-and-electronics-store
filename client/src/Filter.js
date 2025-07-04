class Filter {
  constructor({ search, brands = [], category, colors = [], minPrice, maxPrice, releaseYears = [] }) {
    this.search = search;
    this.brands = [...new Set(brands)];
    this.category = category;
    this.colors = [...new Set(colors)];
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
    this.releaseYears = [...new Set(releaseYears)];
  };

  toParameters() {
    const o = {};
    if (this.search) { o.search = this.search }
    if (this.brands.length != 0) { o.brands = this.brands }
    if (this.category) { o.category = this.category }
    if (this.colors.length != 0) { o.colors = this.colors }
    if (this.minPrice) { o.minPrice = this.minPrice }
    if (this.maxPrice) { o.maxPrice = this.maxPrice }
    if (this.releaseYears.length != 0) { o.releaseYears = this.releaseYears }
    return o;
  }
};

export default Filter;