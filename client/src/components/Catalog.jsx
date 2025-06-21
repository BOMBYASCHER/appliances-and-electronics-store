import { useState, useEffect } from 'react';
import FilterObject from '../Filter.js';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard.jsx';

const CatalogList = ({ products = [], limit, setLimit }) => {
  const { favorites } = useSelector((state) => state.favorites);
  const { products: productsInCart } = useSelector((state) => state.cart);

  const syncedProducts = products.map(product => {
    const isFavorite = product.isFavorite ? true : favorites.find(({ productId }) => productId == product.id) !== undefined;
    const isInCart = product.isInCart ? true : productsInCart.find(({ productId }) => productId == product.id) !== undefined;
    return { ...product, isFavorite, isInCart }
  });
  const btnIsHidden = products.length < limit;
  return (
    <main className='product-list'>
        {syncedProducts.map(p =>  {
          return (<ProductCard
            key={p.id}
            id={p.id}
            title={p.title}
            description={p.description}
            price={p.price}
            image={p.image}
            isFavorite={p.isFavorite}
            isInCart={p.isInCart}
          />)
        }
        )}
      <div className='d-flex justify-content-center row row-cols-3 py-5'>
        <button hidden={btnIsHidden} className='btn btn-primary' onClick={() => setLimit(limit + 9)}>Показать больше</button>
      </div>
    </main>
  );
};

const Catalog = ({ data, filter, setFilter, products, limit, setLimit }) => {
  const { brands, categories, colors, releaseYears, minPrice, maxPrice } = data;

  return (
    <div className='container'>
      <aside className='sidebar'>
        <h2>ФИЛЬТРЫ</h2>
        <h3>Категории</h3>
        <Categories categories={categories} filter={filter} setFilter={setFilter}/>
        <h3>Бренды</h3>
        <Brands brands={brands} filter={filter} setFilter={setFilter}/>
        <h3>Цена</h3>
        <PriceRange minPrice={minPrice} maxPrice={maxPrice} filter={filter} setFilter={setFilter}/>
        <h3>Цвета</h3>
        <Colors colors={colors} filter={filter} setFilter={setFilter}/>
        <h3>Годы выпуска</h3>
        <ReleaseYears years={releaseYears} filter={filter} setFilter={setFilter}/>
      </aside>
      <CatalogList products={products} limit={limit} setLimit={setLimit}/>
    </div>
  )
};

const Brands = ({ brands, filter, setFilter }) => {
  const [checkedBrands, setCheckedBrands] = useState([]);

  useEffect(() => {
    const newFilter = new FilterObject(filter);
    newFilter.brands = checkedBrands;
    setFilter(newFilter);
  }, [checkedBrands]);

  const handleBrandCheckbox = ({ target: { checked } }, brand) => {
    if (checked) {
      setCheckedBrands(checkedBrands.concat(brand));
    } else {
      setCheckedBrands(checkedBrands.filter(b => b !== brand));
    }
  };

  return (brands.sort().map((brand, index) => 
    <p key={index}>
      <label id={index}>
        <input type='checkbox' name={brand} onChange={(e) => handleBrandCheckbox(e, brand)}/>
        {" " + brand}
      </label>
    </p>
  ));
};

const Colors = ({ colors, filter, setFilter }) => {
  const [checkedColors, setCheckedColors] = useState([]);

  useEffect(() => {
    const newFilter = new FilterObject(filter);
    newFilter.colors = checkedColors;
    setFilter(newFilter);
  }, [checkedColors]);

  const handleColorCheckbox = ({ target: { checked } }, color) => {
    if (checked) {
      setCheckedColors(checkedColors.concat(color));
    } else {
      setCheckedColors(checkedColors.filter(c => c !== color));
    }
  };

  return (colors.map((color, index) =>
    <p key={index}>
      <label id={index}>
        <input type='checkbox' name={color} onChange={(e) => handleColorCheckbox(e, color)}/>
        {" " + toLocalColorName(color)}
      </label>
    </p>
  ));
};

const toLocalColorName = (color) => {
  switch(color) {
    case 'white':
      return 'Белый';
    case 'black':
      return 'Чёрный';
    case 'silver':
      return 'Серебристый';
    case 'gray':
      return 'Серый';
    case 'metallic':
      return 'Металлик';
    case 'blue':
      return 'Синий';
    case 'yellow':
      return 'Жёлтый';
    case 'violet':
      return 'Фиолетовый';
  }
};

const Categories = ({ categories, filter, setFilter }) => {
  const [checkedCategory, setCheckedCategory] = useState(null);

  useEffect(() => {
    const newFilter = new FilterObject(filter);
    newFilter.category = checkedCategory;
    setFilter(newFilter);
  }, [checkedCategory]);

  const handleCategoryCheckbox = (category) => {
    if (checkedCategory === category) {
      setCheckedCategory(null);
    } else {
      setCheckedCategory(category);
    }
  };

  return (categories.map((category, index) =>
    <p key={index}>
      <label id={index}>
        <input
          checked={checkedCategory === category}
          type='radio'
          name={category}
          onClick={() => handleCategoryCheckbox(category)}
        />
        {" " + toLocalCategoryName(category)}
      </label>
    </p>
  ));
};

const toLocalCategoryName = (category) => {
  switch(category) {
    case 'washing machine':
      return 'Стиральные машины';
    case 'vacuum':
      return 'Пылесосы';
  }
};

const ReleaseYears = ({ years, filter, setFilter }) => {
  const [checkedReleaseYears, setCheckedReleaseYears] = useState([]);

  useEffect(() => {
    const newFilter = new FilterObject(filter);
    newFilter.releaseYears = checkedReleaseYears;
    setFilter(newFilter);
  }, [checkedReleaseYears]);

  const handleReleaseYearCheckbox = ({ target: { checked } }, year) => {
    if (checked) {
      setCheckedReleaseYears(checkedReleaseYears.concat(year));
    } else {
      setCheckedReleaseYears(checkedReleaseYears.filter(y => y !== year));
    }
  };

  return (years.sort((a, b) => b - a).map((year, index) =>
    <p key={index}>
      <label id={index}>
        <input type='checkbox' name={year} onChange={(e) => handleReleaseYearCheckbox(e, year)}/>
        {" " + year}
      </label> 
    </p>
  ));
};

const PriceRange = ({ minPrice, maxPrice, filter, setFilter }) => {
  const [currentMinPrice, setCurrentMinPrice] = useState(minPrice);
  const [currentMaxPrice, setCurrentMaxPrice] = useState(maxPrice);

  useEffect(() => {
    setCurrentMinPrice(minPrice)
    setCurrentMaxPrice(maxPrice)
  }, [minPrice, maxPrice]);

  const handleMinPriceRange = ({ target: { value } }) => {
    console.log(minPrice)
    console.log(maxPrice)
    if (value < minPrice) {
      setCurrentMinPrice(minPrice);
    } else if (value > currentMaxPrice) {
      setCurrentMinPrice(currentMaxPrice);
    } else {
      setCurrentMinPrice(value);
    }
  };

  const handleMaxPriceRange = ({ target: { value } }) => {
    if (value > maxPrice) {
      setCurrentMaxPrice(maxPrice);
    } else if (value < currentMinPrice) {
      setCurrentMaxPrice(currentMinPrice);
    } else {
      setCurrentMaxPrice(value);
    }
  };

  const handleSliderRelease = () => {
    const newFilter = new FilterObject(filter);
    newFilter.minPrice = currentMinPrice;
    newFilter.maxPrice = currentMaxPrice;
    setFilter(newFilter);
  };
 
  return (
    <>
    <h3>Стоимость от</h3>
    <input
      type="range"
      step={100}
      id="priceRange"
      className="form-range min range-input"
      value={currentMinPrice}
      min={minPrice}
      max={maxPrice}
      onChange={e => handleMinPriceRange(e)}
      onMouseUp={handleSliderRelease}
    />
    <div className='price-values'>
      <span>{currentMinPrice}</span>
      <span>{currentMinPrice}</span>
    </div>
    <input
        type="range"
        step={100}
        id="priceRange"
        className="form-range max range-input"
        value={currentMaxPrice}
        min={minPrice}
        max={maxPrice}
        onChange={e => handleMaxPriceRange(e)}
        onMouseUp={handleSliderRelease}
    />
    <div className='price-values'>
      <span>{currentMaxPrice}</span>
      <span>{currentMaxPrice}</span>
    </div>
    </>
  );
};

{/* <div className='row pb-4'>
  <label>
  Минимальная цена:
  <input
    type='number'
    className="form-control min input my-2"
    value={tempMinPrice}
    placeholder={minPrice}
    min={minPrice}
    max={maxPrice}
    onChange={e => handleMinPrice(e)}
  />
  <input
    type="range"
    className="form-range min range-input"
    value={tempMinPrice ? tempMinPrice : minPrice}
    min={minPrice}
    max={maxPrice}
    onChange={e => handleMinPriceRange(e)}
    onMouseUp={handleSliderRelease}
  />
  </label>
</div>
<div className='row'>
  <label>
  Максимальная цена:
  <input
    type='number'
    className="form-control max input my-2"
    value={tempMaxPrice}
    placeholder={maxPrice}
    min={minPrice}
    max={maxPrice}
    onChange={e => handleMaxPrice(e)}
  />
  <input
    type="range"
    className="form-range max range-input"
    value={tempMaxPrice ? tempMaxPrice : maxPrice}
    min={minPrice}
    max={maxPrice}
    onChange={e => handleMaxPriceRange(e)}
    onMouseUp={handleSliderRelease}
  />
  </label>
</div> */}

export default Catalog;
